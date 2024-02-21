using Microsoft.Identity.Client;

namespace FinanceTracker.Data.DTO
{
    public class ModifyCategoryDTO
    {
        public string userId {  get; set; }
        public int budgetId { get; set; }
        public int categoryId { get; set; }
        public string categoryName { get; set; }
        public decimal categoryLimit { get; set; }
    }
}
