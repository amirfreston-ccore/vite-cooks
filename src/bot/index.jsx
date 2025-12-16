import { useState, useEffect, useMemo } from "react"
import { AlertCircle, Bot, Loader } from "lucide-react"
// import AddBotBalance from './AddBotBalance'
// import BotActiveToggle from './BotActiveToggle'
// import WithdrawBalance from './WithdrawBalance'

const PAYMENT_CONTRACT_ADDRESS = "PAYMENT_CONTRACT_ADDRESS"
const FortezzaPaymentContractAbi = []
const api = ()=> null
const useSign = ()=> ({
    handleSign: ()=> null,
    isLoading: false,
    isSigned: false,
    authData: null,
    error: null,
    isConnected: false,
    address: null,
})

const useAppKit = ()=> ({
    open: ()=> null,
})

const formatUnits = (...args) => {
    return args
}

const parseUnits = (...args) => {
    return args
}

// Mocked version of useContractInteraction so UI logic can be exercised without the on-chain hook
const contractDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms))

const toUnits = (value = 0, decimals = 18) => {
    try {
        return parseUnits(String(value), decimals)
    } catch (error) {
        return 0n
    }
}

const defaultBotSummary = (balance = 0n) => ([
    0n,
    balance,
    true,
    BigInt(Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60),
])

function useContractInteraction({
    functionName,
    enabled = true,
    disabled = false,
    mockData,
}) {
    const resolvedMockData = useMemo(() => {
        if (typeof mockData !== 'undefined') return mockData

        switch (functionName) {
            case 'getBotAccountSummary':
                return defaultBotSummary()
            case 'botSubscriptionFee':
                return toUnits(100)
            case 'allowance':
            case 'balanceOf':
                return 0n
            default:
                return null
        }
    }, [mockData, functionName])

    const [data, setData] = useState(resolvedMockData)
    const [isApproving, setIsApproving] = useState(false)
    const [error, setError] = useState(null)
    const [receipt, setReceipt] = useState(null)

    useEffect(() => {
        setData(resolvedMockData)
    }, [resolvedMockData])

    const refetch = async () => {
        if (!enabled) return data
        setData(resolvedMockData)
        return resolvedMockData
    }

    const execute = async () => {
        if (disabled) return null
        setIsApproving(true)
        setError(null)
        try {
            await contractDelay()
            const mockReceipt = {
                status: 'success',
                functionName,
                timestamp: Date.now(),
                txHash: `0xmock-${functionName}-${Date.now()}`,
            }
            setReceipt(mockReceipt)
            return mockReceipt
        } catch (err) {
            setError(err)
            throw err
        } finally {
            setIsApproving(false)
        }
    }

    return {
        data,
        refetch,
        execute,
        isApproving,
        error,
        receipt,
    }
}





export default function TradingBot() {
    const {
        handleSign,
        isLoading: isSignLoading,
        isSigned,
        authData,
        error: signError,
        isConnected,
        address,
        isAuthenticated,
    } = useSign()
    const { stableCoin, stableCoinDecimals, tezonGoldToken, TNGDDecimels } = {}
    const { toast  = ()=> null} = {}
    const { open } = useAppKit()

    const stableCoinDecimalsValue = stableCoinDecimals || 18
    const TNGDDecimalsValue = TNGDDecimels || 6

    const mockStableBalance = useMemo(() => toUnits(1250, stableCoinDecimalsValue), [stableCoinDecimalsValue])
    const mockTNGDBalance = useMemo(() => toUnits(740, TNGDDecimalsValue), [TNGDDecimalsValue])
    const mockSubscriptionFee = useMemo(() => toUnits(100, stableCoinDecimalsValue), [stableCoinDecimalsValue])
    const mockAllowance = useMemo(() => toUnits(50, stableCoinDecimalsValue), [stableCoinDecimalsValue])
    const mockBotSummary = useMemo(() => defaultBotSummary(mockStableBalance), [mockStableBalance])

    // Bot state
    const [userBotData, setUserBotData] = useState({
        subscribed: true,
        balance: 0,
        tokenBalance: 0,
        subscriptionExpiry: null,
        botStatus: 'inactive',
    })
    const [botActive, setBotActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingBalance, setLoadingBalance] = useState(false)
    const [loadingBotData, setLoadingBotData] = useState(true)
    const [currentAction, setCurrentAction] = useState(null)

    // Get USDT balance
    const { data: USDTBalance = 0n, refetch: refetchUSDT } = useContractInteraction({
        contractAddress: stableCoin,
        contractAbi: [],
        functionName: "balanceOf",
        functionArgs: [address],
        enabled: isConnected && !!address,
        mockData: mockStableBalance,
    })

    const USDTBalanceHuman = formatUnits(USDTBalance || 0n, stableCoinDecimals || 18);

    // Get TNGD balance
    const { data: TNGDBalance = 0n, refetch: refetchTNGD } = useContractInteraction({
        contractAddress: tezonGoldToken,
        contractAbi: [],
        functionName: "balanceOf",
        functionArgs: [address],
        enabled: isConnected && !!address,
        mockData: mockTNGDBalance,
    })

    const TNGDBalanceHuman = formatUnits(TNGDBalance || 0n, TNGDDecimels || 6);

    // Get bot account summary from contract
    const { data: botAccountSummary, refetch: refetchBotSummary } = useContractInteraction({
        contractAddress: PAYMENT_CONTRACT_ADDRESS,
        contractAbi: FortezzaPaymentContractAbi,
        functionName: "getBotAccountSummary",
        functionArgs: [address],
        enabled: isConnected && !!address,
        mockData: mockBotSummary,
    })

    // Get bot subscription fee
    const { data: botSubscriptionFee } = useContractInteraction({
        contractAddress: PAYMENT_CONTRACT_ADDRESS,
        contractAbi: FortezzaPaymentContractAbi,
        functionName: "botSubscriptionFee",
        functionArgs: [],
        enabled: !!PAYMENT_CONTRACT_ADDRESS,
        mockData: mockSubscriptionFee,
    })


    // Format balance to match Spot Trading display
    const formattedUSDTBalance = parseFloat(USDTBalanceHuman).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    })



    // Get allowance for payment contract
    const { data: allowance, refetch: refetchAllowance } = useContractInteraction({
        contractAddress: stableCoin,
        contractAbi: [],
        functionName: 'allowance',
        functionArgs: [address, PAYMENT_CONTRACT_ADDRESS],
        enabled: !!address,
        mockData: mockAllowance,
    })

    // Fetch bot details from API
    const fetchBotDetails = async () => {
        if (!isConnected || !address || !isAuthenticated || botAccountSummary === undefined) {
            setLoadingBotData(false)
            return
        }

        setLoadingBalance(true)
        setLoadingBotData(true)
        try {
            const { data } = await api.get(`/dca-bot/details`, { address })
            const apiData = data.data.account_summary
            const botConfig = data.data.bot_configuration

            // Get subscription status from contract
            const contractSubscribed = botAccountSummary ? botAccountSummary[2] : false
            const contractExpiry = botAccountSummary ? botAccountSummary[3] : 0
            const botStatus = botConfig?.status || 'inactive'

            setUserBotData({
                subscribed: contractSubscribed,
                balance: apiData.availableStableCoinBalance || 0,
                tokenBalance: apiData.availableTokenBalance || 0,
                subscriptionExpiry: contractExpiry > 0 ? new Date(Number(contractExpiry) * 1000) : null,
                botStatus,
            })
            setBotActive(botStatus === 'active')
        } catch (error) {
            console.log('Bot details API error:', error)
        } finally {
            setLoadingBalance(false)
            setLoadingBotData(false)
        }
    }

    // Update bot data when contract or API data changes
    useEffect(() => {
        if (isConnected && address && isAuthenticated && botAccountSummary !== undefined) {
            fetchBotDetails()
        }
    }, [botAccountSummary, isConnected, address, isAuthenticated])

    // Subscribe to bot after approval
    const { execute: subscribeBot, isApproving: isSubscribing, error: subscribeError, receipt: subscribeReceipt } = useContractInteraction({
        contractAddress: PAYMENT_CONTRACT_ADDRESS,
        contractAbi: FortezzaPaymentContractAbi,
        functionName: 'subscribeBot',
        functionArgs: [],
        disabled: !isConnected || currentAction !== 'subscribe',
    })



    // Calculate subscription allowance (existing + fee)
    const decimals = stableCoinDecimals || 18
    const subscriptionFeeAmount = botSubscriptionFee ? botSubscriptionFee : parseUnits('100', decimals)
    const subscriptionApprovalAmount = (allowance || 0n) + subscriptionFeeAmount

    // Approve USDT for subscription
    const { execute: approveSubscription, isApproving: isApprovingSubscription, error: approvalErrorSubscription, receipt: approvalReceipt } = useContractInteraction({
        contractAddress: stableCoin,
        contractAbi: [],
        functionName: 'approve',
        functionArgs: [PAYMENT_CONTRACT_ADDRESS, subscriptionApprovalAmount],
        disabled: !isConnected || currentAction !== 'subscribe',
    })





    // Initialize user bot data from contract
    useEffect(() => {
        if (isConnected && address) {
            refetchBotSummary()
        }
    }, [isConnected, address])

    const handleSubscribe = async () => {
        if (!isConnected) {
            toast({
                title: 'Wallet not connected',
                description: 'Please connect your wallet first',
                variant: 'error',
            })
            return
        }

        const totalRequired = parseFloat(formatUnits(subscriptionApprovalAmount, stableCoinDecimals || 18))
        const currentAllowance = parseFloat(formatUnits(allowance || 0n, stableCoinDecimals || 18))
        const subscriptionFee = parseFloat(formatUnits(subscriptionFeeAmount, stableCoinDecimals || 18))

        if (parseFloat(USDTBalanceHuman) < totalRequired) {
            toast({
                title: 'Insufficient balance',
                description: `You need at least ${totalRequired.toFixed(2)} USDT (${currentAllowance.toFixed(2)} existing + ${subscriptionFee.toFixed(2)} new)`,
                variant: 'error',
            })
            return
        }

        setLoading(true)
        setCurrentAction('subscribe')

        try {
            // if (!allowance || allowance < subscriptionFeeAmount) {
            toast({
                title: 'Allowance Info',
                description: `Approving ${totalRequired.toFixed(2)} USDT (${currentAllowance.toFixed(2)} existing + ${subscriptionFee.toFixed(2)} new)`,
                variant: 'info',
            })
            await approveSubscription()
            // } else {
            //     await subscribeBot()
            // }
        } catch (err) {
            console.error('Subscription error:', err)
            setLoading(false)
            setCurrentAction(null)
        }
    }







    // Handle approval success - trigger subscribeBot
    useEffect(() => {
        if (approvalReceipt && approvalReceipt.status === 'success') {
            console.log('Approval successful, calling subscribeBot')
            refetchAllowance()
            setTimeout(async () => {
                try {
                    await subscribeBot()
                } catch (error) {
                    console.error('Subscribe bot error:', error)
                    setLoading(false)
                    setCurrentAction(null)
                }
            }, 100)
        }
    }, [approvalReceipt])

    // Handle subscribeBot success
    useEffect(() => {
        if (subscribeReceipt && subscribeReceipt.status === 'success' && loading) {
            console.log('Bot subscription successful!')
            toast({
                title: 'Subscription successful!',
                description: 'Bot subscription activated',
                variant: 'success',
            })
            setLoading(false)
            setCurrentAction(null)
            // Wait for blockchain to update then refetch
            setTimeout(() => {
                refetchBotSummary()
            }, 3000)
        }
    }, [subscribeReceipt, loading])

    // Handle approval errors
    useEffect(() => {
        const error = approvalErrorSubscription || subscribeError
        if (error) {
            const errorMessage = error.toString()
            if (errorMessage.toLowerCase().includes("user rejected")) {
                toast({
                    title: 'Transaction rejected',
                    description: 'You rejected the transaction in your wallet',
                    variant: 'error',
                })
                setLoading(false)
            } else {
                // toast({
                //     title: 'Transaction failed',
                //     description: errorMessage,
                //     variant: 'error',
                // })
                console.log("approvalErrorSubscription----error", errorMessage);
            }
            setCurrentAction(null)
        }
    }, [approvalErrorSubscription, subscribeError])


    return (
        <div className="relative space-y-4 p-2 lg:px-4 lg:min-w-80 2xl:w-80">
            {/* Sign in button */}
            {!isAuthenticated && (
                <div className="absolute inset-0 backdrop-blur-[2px] z-40 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isConnected) {
                                open();
                                return;
                            }
                            if (!isAuthenticated) {
                                handleSign();
                            }
                        }}
                        disabled={isSignLoading}
                        className="h-12 px-8 text-base text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 lg:shadow-blue-500/20 lg:border border-blue-400/30"
                    >
                        {isSignLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Signing...</span>
                            </div>
                        ) : isConnected ? <p>Sign in to Trade</p> : "Connect Wallet"}
                    </button>
                </div>
            )}
            {/* Combined Overview Card */}
            <div className="bg-transparent border-0 border-slate-700 gap-0 space-y-0 rounded-none p-0 m-0">
                <div className="px-0 space-y-3">
                    {/* Subscription Status */}
                    <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                        <div className="flex items-center justify-between ">
                            <span className="text-slate-400 text-sm">Subscription</span>
                            {loadingBotData ? (
                                <Loader className="h-4 w-4 animate-spin text-slate-400" />
                            ) : (
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${userBotData.subscribed ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}> 
                                    {userBotData.subscribed ? "Active" : "Inactive"}
                                </span>
                            )}
                        </div>
                        {!loadingBotData && userBotData.subscribed && userBotData.subscriptionExpiry && (
                            <p className="text-xs text-slate-400 ">
                                Expires: {userBotData.subscriptionExpiry.toLocaleDateString()}
                            </p>
                        )}
                        {!loadingBotData && !userBotData.subscribed && (
                            <button
                                type="button"
                                onClick={handleSubscribe}
                                // disabled={loading || !isConnected}
                                disabled={true}
                                className="w-full bg-green-600 hover:bg-green-700 text-white mt-3"
                            >
                                {(loading && currentAction === 'subscribe') || isApprovingSubscription || isSubscribing ? (
                                    <Loader className="h-4 w-4 animate-spin mr-2" />
                                ) : null}
                                Subscribe ({botSubscriptionFee ? parseFloat(formatUnits(botSubscriptionFee, stableCoinDecimals || 18)) : 100} USDT)
                            </button>
                        )}
                        {!userBotData?.subscribed && <p className="text-gray-400 text-sm mt-2">The bot will be available for use soon.</p>}
                    </div>

                    {/* Bot Active */}
                    {/* <BotActiveToggle
                        botActive={botActive}
                        setBotActive={setBotActive}
                        userBotData={userBotData}
                        loadingBotData={loadingBotData}
                        onStatusChange={(status) => {
                            setUserBotData(prev => ({ ...prev, botStatus: status }))
                        }}
                    /> */}

                    {/* Balance Section */}
                    <div className="space-y-3">
                        {/* Bot Balance - Primary */}
                        <div className={`rounded-lg p-4  relative overflow-hidden ${!userBotData.subscribed || !botActive
                            ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20'
                            : 'bg-gradient-to-r from-emerald-500/20 to-emerald-600'
                            }`}>
                            <div className={`absolute inset-0 animate-pulse ${!userBotData.subscribed || !botActive
                                ? 'bg-amber-500/5'
                                : 'bg-emerald-500/5'
                                }`}></div>
                            <div className="relative z-10">
                                <div className="">
                                    <div className="flex mb-2 items-center space-x-2">
                                        <div className={`p-2 rounded-full ${!userBotData.subscribed || !botActive
                                            ? 'bg-amber-500/30'
                                            : 'bg-emerald-500/30'
                                            }`}>
                                            <Bot className={`h-5 w-5 ${!userBotData.subscribed || !botActive
                                                ? 'text-amber-300'
                                                : 'text-emerald-300'
                                                }`} />
                                        </div>

                                        <div className="">
                                            <p className={`text-xs uppercase tracking-wide mb-1 ${!userBotData.subscribed || !botActive
                                                ? 'text-amber-300'
                                                : 'text-emerald-300'
                                                }`}>Bot Wallet Balance</p>
                                            <div className="space-y-1">
                                                {loadingBalance ? (
                                                    <div className="flex items-center space-x-2">
                                                        <Loader className="h-4 w-4 animate-spin text-white" />
                                                        <span className="text-white text-sm">Loading balance...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="text-2xl font-bold text-white">{userBotData.balance.toLocaleString()}  <span className={`text-sm ${!userBotData.subscribed || !botActive
                                                            ? 'text-amber-400'
                                                            : 'text-emerald-400'
                                                            }`}>USDT</span></p>
                                                        {/* <p className="text-lg font-semibold text-white">{userBotData.tokenBalance.toLocaleString()}  <span className={`text-sm ${!userBotData.subscribed || !botActive
                                                            ? 'text-amber-400'
                                                            : 'text-emerald-400'
                                                            }`}>TNGD</span></p> */}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>

                        {/* Add Balance to Bot */}
                        {/* {userBotData.subscribed && (
                            <AddBotBalance
                                formattedUSDTBalance={formattedUSDTBalance}
                                onSuccess={() => fetchBotDetails()}
                            />
                        )} */}

                        {/* Performance Metrics */}
                        {/* <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <p className="text-xs text-emerald-400 uppercase tracking-wide mb-1">Total PnL</p>
                                <p className="text-xl font-bold text-emerald-400">$0</p>
                            </div>
                            <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <p className="text-xs text-emerald-400 uppercase tracking-wide mb-1">Total ROI</p>
                                <p className="text-xl font-bold text-emerald-400">0%</p>
                            </div>
                        </div> */}
                    </div>

                    {/* Withdraw Balance */}
                    {/* {userBotData.subscribed && (
                        <WithdrawBalance
                            userBotData={userBotData}
                            onSuccess={() => {
                                fetchBotDetails()
                            }}
                        />
                    )} */}

               <p className="text-gray-400 text-xs text-center"><span className="text-base leading-0 text-yellow-600">⚠</span> By subscribing to and using this bot, you acknowledge that you understand the risks involved in crypto trading and accept full responsibility for your investment decisions.</p>
                </div>
            </div>
        </div>
    )
}
