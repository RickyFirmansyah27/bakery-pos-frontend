import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UsersRound, Plus, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';

// Mock data for team members
const teamMembers = [
  { id: 1, name: 'Emma Johnson', role: 'Manager', status: 'online', avatar: '' },
  { id: 2, name: 'James Wilson', role: 'Cashier', status: 'online', avatar: '' },
  { id: 3, name: 'Olivia Smith', role: 'Baker', status: 'offline', avatar: '' },
  { id: 4, name: 'Liam Brown', role: 'Waiter', status: 'offline', avatar: '' },
  { id: 5, name: 'Sophia Miller', role: 'Baker', status: 'online', avatar: '' },
  { id: 6, name: 'Noah Garcia', role: 'Cashier', status: 'online', avatar: '' },
];

// Default avatar fallback
const getDefaultAvatar = (name: string) => {
  return "https://placehold.co/200/9b87f5/ffffff?text=" + name.charAt(0).toUpperCase();
};

type TeamMemberFormValues = {
  name: string;
  role: string;
}

const Teams = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamMembersList, setTeamMembersList] = useState(teamMembers);
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm<TeamMemberFormValues>({
    defaultValues: {
      name: '',
      role: 'Cashier'
    }
  });

  // Mock query for team members
  const { data: members = teamMembersList, isLoading } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: () => Promise.resolve(teamMembersList),
  });

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeamMember = (data: TeamMemberFormValues) => {
    const newMember = {
      id: teamMembersList.length + 1,
      name: data.name,
      role: data.role,
      status: 'online',
      avatar: ''
    };
    
    setTeamMembersList([...teamMembersList, newMember]);
    
    toast({
      title: "Team member added",
      description: `${data.name} has been added as a ${data.role}`,
    });
    
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="p-6">
      {/* Remove the Header component as it's now handled by the Layout component */}

      <div className="mt-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading team members...</p>
          ) : (
            filteredMembers.map((member) => (
              <Card key={member.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage 
                        src={member.avatar || getDefaultAvatar(member.name)} 
                        alt={member.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getDefaultAvatar(member.name);
                        }}
                      />
                      <AvatarFallback>{member.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <Badge className={member.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                    {member.status === 'online' ? 'Active' : 'Offline'}
                  </Badge>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <div className="text-xs text-gray-500">
                      <p>Today's orders: 14</p>
                      <p>Performance: 98%</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Profile</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Add Team Member Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleAddTeamMember)}>
            <div className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="Cashier">Cashier</option>
                        <option value="Waiter">Waiter</option>
                        <option value="Baker">Baker</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teams;
