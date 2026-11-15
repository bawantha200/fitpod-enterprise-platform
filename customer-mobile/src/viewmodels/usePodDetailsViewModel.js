import { useState } from 'react';

// Pod data
// Add more pods to this array when new pods become available.
const PODS = [
  {
    id: 'POD-001',
    name: 'FitPod Private Fitness Pod',
    description: 'Your private space for a better workout experience.',
    capacity: 4,
    equipment: ['Treadmill', 'Dumbbells', 'Bench', 'Mat'],
    status: 'AVAILABLE',
    hourlyRate: null,
  },

  // Future pods can be added here.
  // {
  //   id: 'POD-002',
  //   name: 'FitPod Private Fitness Pod 02',
  //   description: 'Private fitness space.',
  //   capacity: 4,
  //   equipment: ['Treadmill', 'Dumbbells', 'Bench', 'Mat'],
  //   status: 'AVAILABLE',
  //   hourlyRate: null,
  // },
];

const usePodDetailsViewModel = () => {
  const [pods] = useState(PODS);

  const [selectedPodId, setSelectedPodId] = useState(
    PODS.find((pod) => pod.status === 'AVAILABLE')?.id || null
  );

  const selectedPod = pods.find(
    (pod) => pod.id === selectedPodId
  ) || null;

  const selectPod = (podId) => {
    const pod = pods.find((item) => item.id === podId);

    if (pod && pod.status === 'AVAILABLE') {
      setSelectedPodId(podId);
    }
  };

  const availablePodCount = pods.filter(
    (pod) => pod.status === 'AVAILABLE'
  ).length;

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return 'To be confirmed';
    }

    return `Rs. ${Number(price).toLocaleString('en-LK')} / hour`;
  };

  const canContinue = selectedPod !== null;

  return {
    pods,
    selectedPod,
    selectedPodId,
    availablePodCount,
    canContinue,
    selectPod,
    formatPrice,
  };
};

export default usePodDetailsViewModel;
