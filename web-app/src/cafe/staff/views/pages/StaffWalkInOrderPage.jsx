/**
 * StaffWalkInOrderPage.jsx  (View)
 * Placeholder - replaced by the real screen in a later step.
 */
import PagePlaceholder from '../../../common/views/components/PagePlaceholder';

export default function StaffWalkInOrderPage() {
  return (
    <PagePlaceholder
      title="Walk-in Order"
      description="Create an order for a customer at the counter."
      useCases={[
        'Select walk-in order items and quantities',
        'Add walk-in order notes',
        'Review the order and calculate the total',
        'Submit walk-in order',
      ]}
    />
  );
}
