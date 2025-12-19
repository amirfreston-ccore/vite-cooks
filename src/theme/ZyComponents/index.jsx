import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { AlertCircle, Calendar as CalendarIcon, Check, ChevronDown, Home, Mail, Settings, User } from 'lucide-react';


import DashboardCompositions from './dashboard'
const ShadcnUIDemo = () => {
  const [date, setDate] = useState(new Date());
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className='bg-soft'>
        <DashboardCompositions />


      <div className="p-8 max-w-7xl mx-auto">


        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Shadcn UI Components Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <Separator />

            {/* Form Elements */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Form Elements</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here." />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" checked={switchValue} onCheckedChange={setSwitchValue} />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Badges & Avatars */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Badges & Avatars</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <Separator />

            {/* Progress & Sliders */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Progress & Sliders</h3>
              <div className="space-y-4">
                <div>
                  <Label>Progress: {progress}%</Label>
                  <Progress value={progress} className="w-full" />
                  <Button onClick={() => setProgress(Math.min(100, progress + 10))} className="mt-2">
                    Increase Progress
                  </Button>
                </div>
                <div>
                  <Label>Slider Value: {sliderValue[0]}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Tabs</h3>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-2">
                  <p>Make changes to your account here.</p>
                  <Input placeholder="Username" />
                </TabsContent>
                <TabsContent value="password" className="space-y-2">
                  <p>Change your password here.</p>
                  <Input type="password" placeholder="Current password" />
                </TabsContent>
                <TabsContent value="settings" className="space-y-2">
                  <p>Manage your settings here.</p>
                  <Switch />
                </TabsContent>
              </Tabs>
            </div>

            <Separator />

            {/* Select & Radio Group */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Select & Radio Group</h3>
              <div className="space-y-4">
                <div>
                  <Label>Select Framework</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Choose Option</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Separator />

            {/* Toggle & Toggle Group */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Toggle & Toggle Group</h3>
              <div className="space-y-4">
                <Toggle>Toggle</Toggle>
                <ToggleGroup type="multiple">
                  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <Separator />

            {/* Calendar & Command */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Calendar & Command</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Calendar</Label>
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </div>
                <div>
                  <Label>Command Menu</Label>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem><Calendar className="mr-2 h-4 w-4" />Calendar</CommandItem>
                      <CommandItem><User className="mr-2 h-4 w-4" />Profile</CommandItem>
                      <CommandItem><Settings className="mr-2 h-4 w-4" />Settings</CommandItem>
                    </CommandGroup>
                  </Command>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tooltip & Hover Card */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Tooltip & Hover Card</h3>
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">@nextjs</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>VC</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">@nextjs</h4>
                        <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>

            <Separator />

            {/* Collapsible & Aspect Ratio */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Collapsible & Aspect Ratio</h3>
              <div className="space-y-4">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex items-center justify-between w-full">
                      Can I use this in my project?
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                      Yes. Free to use for personal and commercial projects.
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <div className="w-[200px]">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <div className="flex items-center justify-center h-full rounded-md border">
                      16:9 Aspect Ratio
                    </div>
                  </AspectRatio>
                </div>
              </div>
            </div>

            <Separator />

            {/* Scroll Area */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Scroll Area</h3>
              <div>
                <Label>Scroll Area</Label>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div key={i} className="text-sm">
                      Item {i + 1}
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>

            <Separator />

            {/* Menubar & Navigation Menu */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Menubar & Navigation Menu</h3>
              <div className="space-y-4">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New Tab</MenubarItem>
                      <MenubarItem>New Window</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Share</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 md:w-[400px]">
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                            <div className="text-sm font-medium leading-none">Introduction</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Re-usable components built using Radix UI and Tailwind CSS.
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <Separator />

            {/* Breadcrumb & Pagination */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Breadcrumb & Pagination</h3>
              <div className="space-y-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>

            <Separator />

            {/* Context Menu & Drawer */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Context Menu & Drawer</h3>
              <div className="flex gap-4">
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                    Right click here
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-64">
                    <ContextMenuItem>Back</ContextMenuItem>
                    <ContextMenuItem>Forward</ContextMenuItem>
                    <ContextMenuItem>Reload</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            <Separator />

            {/* Alerts */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Alerts</h3>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>
                    You can add components to your app using the cli.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <Separator />

            {/* Dialogs & Popovers */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Dialogs & Popovers</h3>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Continue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                      <div className="grid gap-2">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" defaultValue="100%" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <Separator />

            {/* Table */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Table</h3>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <Separator />

            {/* Accordion */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Accordion</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other components' aesthetic.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Separator />

            {/* Dropdown Menu */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Dropdown Menu</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator />

            {/* Skeleton Loading */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Skeleton Loading</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>


          </CardContent>
        </Card>
        
      </div>
    </div>  );
};

export default ShadcnUIDemo;