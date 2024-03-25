using System;
using System.Collections.Generic;

namespace FinanceTracker.Data;

public partial class Purchase
{
    public int Id { get; set; }

    public int BudgetId { get; set; }

    public int CategoryId { get; set; }

    public string PurchaseName { get; set; } = null!;

    public decimal PurchaseTotal { get; set; }

    public virtual Budget Budget { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;
}
