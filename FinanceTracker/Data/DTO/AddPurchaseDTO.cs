namespace FinanceTracker.Data.DTO
{
    public class AddPurchaseDTO
    {
        public string userId { get; set; }
        public int budgetId { get; set; }
        public int categoryId { get; set; }
        public string purchaseName {  get; set; }
        public decimal purchaseTotal { get; set; }
        public string purchaseDate { get; set; }
    }
}
