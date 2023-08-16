using System;
using System.Collections.Generic;

namespace FinanceTracker.Data;

public partial class Budget
{
    public int Id { get; set; }

    public string UserId { get; set; } = null!;

    public string BudgetName { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
}
