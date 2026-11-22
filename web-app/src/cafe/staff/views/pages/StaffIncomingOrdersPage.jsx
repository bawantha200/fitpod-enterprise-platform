/**
 * StaffIncomingOrdersPage.jsx  (View)
 * Placeholder - replaced by the real screen in a later step.
 */
import PagePlaceholder from '../../../common/views/components/PagePlaceholder';

export default function StaffIncomingOrdersPage() {
  return (
    <PagePlaceholder
      title="Incoming Orders"
      description="Orders waiting for the kitchen."
      useCases={[
        'View incoming orders',
        'Accept or reject an order',
        'Mark as Preparing, Ready or Completed',
        'View order details',
        'Manage order cancellation',
      ]}
    />
  );
}
