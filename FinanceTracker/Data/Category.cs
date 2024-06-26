﻿using System;
using System.Collections.Generic;

namespace FinanceTracker.Data;

public partial class Category
{
    public int Id { get; set; }

    public int BudgetId { get; set; }

    public string CategoryName { get; set; } = null!;

    public decimal CategoryTotal { get; set; }

    public DateTime CategoryDate { get; set; }

    public virtual Budget Budget { get; set; } = null!;

    public virtual ICollection<Purchase> Purchases { get; set; } = new List<Purchase>();
}
