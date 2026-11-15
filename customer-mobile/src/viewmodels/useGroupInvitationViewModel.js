import { useMemo, useState } from 'react';

// DEMO DATA ONLY
// Replace this with users returned by the backend API.
const DEMO_USERS = [
  {
    id: 'U001',
    name: 'Kasun Perera',
    email: 'kasun@gmail.com',
    walletBalance: 5000,
  },
  {
    id: 'U002',
    name: 'Nimal Silva',
    email: 'nimal@gmail.com',
    walletBalance: 500,
  },
  {
    id: 'U003',
    name: 'Tharushi Fernando',
    email: 'tharushi@gmail.com',
    walletBalance: 3500,
  },
  {
    id: 'U004',
    name: 'Amal Jayawardena',
    email: 'amal@gmail.com',
    walletBalance: 800,
  },
  {
    id: 'U005',
    name: 'Ravindu Perera',
    email: 'ravindu@gmail.com',
    walletBalance: 6000,
  },
];

const DEMO_ORGANIZER_BALANCE = 5000;

const useGroupInvitationViewModel = (bookingDetails = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [invitationsSent, setInvitationsSent] = useState(false);

  const totalPrice = Number(bookingDetails.totalPrice || 0);

  const totalPeople = selectedMembers.length + 1;

  const pricePerPerson = useMemo(() => {
    if (totalPeople <= 0) return 0;

    return Math.ceil((totalPrice * 100) / totalPeople) / 100;
  }, [totalPrice, totalPeople]);

  const organizerBalance = DEMO_ORGANIZER_BALANCE;

  const organizerAvailable = organizerBalance >= pricePerPerson;

  const availableUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return DEMO_USERS
      .filter((user) => {
        if (!query) return true;

        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      })
      .map((user) => {
        const alreadyAdded = selectedMembers.some(
          (member) => member.id === user.id
        );

        // Calculate the share if this user joins the group.
        const proposedPeople = selectedMembers.length + 2;

        const proposedShare =
          Math.ceil((totalPrice * 100) / proposedPeople) / 100;

        const canAfford =
          user.walletBalance >= proposedShare &&
          organizerBalance >= proposedShare;

        return {
          ...user,
          alreadyAdded,
          proposedShare,
          isAvailable: !alreadyAdded && canAfford,
        };
      });
  }, [searchQuery, selectedMembers, totalPrice, organizerBalance]);

  const addMember = (user) => {
    if (!user.isAvailable || user.alreadyAdded) return;

    setSelectedMembers((previous) => [
      ...previous,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        walletBalance: user.walletBalance,
      },
    ]);
  };

  const removeMember = (userId) => {
    setSelectedMembers((previous) =>
      previous.filter((member) => member.id !== userId)
    );
  };

  const allWalletsAvailable = useMemo(() => {
    return (
      organizerAvailable &&
      selectedMembers.every(
        (member) => member.walletBalance >= pricePerPerson
      )
    );
  }, [organizerAvailable, selectedMembers, pricePerPerson]);

  const canSendInvitations =
    selectedMembers.length > 0 &&
    allWalletsAvailable &&
    !invitationsSent;

  // UI demo action.
  // Real invitation creation must be handled by the backend.
  const sendInvitations = () => {
    if (!canSendInvitations) return false;

    setInvitationsSent(true);
    return true;
  };

  return {
    searchQuery,
    setSearchQuery,

    availableUsers,
    selectedMembers,

    totalPrice,
    totalPeople,
    pricePerPerson,

    organizerBalance,
    organizerAvailable,
    allWalletsAvailable,

    invitationsSent,
    canSendInvitations,

    addMember,
    removeMember,
    sendInvitations,
  };
};

export default useGroupInvitationViewModel;
