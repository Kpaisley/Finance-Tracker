namespace FinanceTracker.Data.DTO
{
    public class AddCategoryDTO
    {
        public string userId { get; set; }
        public int budgetId { get; set; }
        public string categoryName { get; set; }
        public decimal categoryLimit { get; set; }
    }
}
