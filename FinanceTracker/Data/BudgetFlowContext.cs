using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data;

public partial class BudgetFlowContext : DbContext
{
    public BudgetFlowContext()
    {
    }

    public BudgetFlowContext(DbContextOptions<BudgetFlowContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Budget> Budgets { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:BudgetFlow");

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
            entity.Property(e => e.CategoryName)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.CategoryTotal).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Budget).WithMany(p => p.Categories)
                .HasForeignKey(d => d.BudgetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Categorie__Budge__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
