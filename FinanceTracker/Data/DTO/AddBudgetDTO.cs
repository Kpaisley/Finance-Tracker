namespace FinanceTracker.Data.DTO
{
    public class AddBudgetDTO
    {
        public string userId { get; set; }
        public string budgetName { get; set; }
        public DateTime dateCreated { get; set; }
        public DateTime dateLastModified { get; set; }

    }
}
