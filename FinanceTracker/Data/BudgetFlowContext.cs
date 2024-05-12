using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data;

public partial class BudgetFlowContext : DbContext
{
    private readonly IConfiguration _configuration;
    private readonly string conn;

    public BudgetFlowContext(DbContextOptions<BudgetFlowContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
        conn = _configuration.GetConnectionString("BudgetFlow");
    }

    public virtual DbSet<Budget> Budgets { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Purchase> Purchases { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(conn);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Budget>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Budgets__3214EC2743CEC4F2");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BudgetName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DateCreated).HasColumnType("date");
            entity.Property(e => e.DateLastModified).HasColumnType("date");
            entity.Property(e => e.UserId)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC2787C123CA");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BudgetId).HasColumnName("BudgetID");
            entity.Property(e => e.CategoryDate).HasColumnType("date");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.CategoryTotal).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Budget).WithMany(p => p.Categories)
                .HasForeignKey(d => d.BudgetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Categorie__Budge__398D8EEE");
        });

        modelBuilder.Entity<Purchase>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Purchase__3214EC27231B4539");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.BudgetId).HasColumnName("BudgetID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.PurchaseDate).HasColumnType("date");
            entity.Property(e => e.PurchaseName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PurchaseTotal).HasColumnType("decimal(9, 2)");

            entity.HasOne(d => d.Budget).WithMany(p => p.Purchases)
                .HasForeignKey(d => d.BudgetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Purchases__Budge__5CD6CB2B");

            entity.HasOne(d => d.Category).WithMany(p => p.Purchases)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Purchases__Categ__5DCAEF64");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
