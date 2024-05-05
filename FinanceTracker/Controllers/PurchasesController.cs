using FinanceTracker.Data;
using FinanceTracker.Data.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {

        private readonly BudgetFlowContext _context;

        public PurchasesController(BudgetFlowContext context)
        {
            _context = context;
        }



        //RETURN A USERS PURCHASES FOR THEIR ASSOCIATED BUDGET
        // GET: api/<PurchasesController>
        [HttpGet("{userId}/{budgetId}")]
        public IEnumerable<Purchase> Get(string userId, int budgetId)
        {
            //INITIALIZE EMPTY ARRAY OF PURCHASES
            var budgetPurchases = new List<Purchase>();

            //INITIALIZE USER BUDGET TO VERIFY IT BELONGS TO USER
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(userId) && b.Id == budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
            {
                //LOAD ALL CATEGORIES ASSOCIATED TO THE USER BUDGET
                _context.Entry(userBudget).Collection(b => b.Purchases).Load();

                foreach (Purchase p in userBudget.Purchases)
                {
                    //ADD ALL CATEGORIES ASSOCIATED TO THE USER BUDGET INTO BudgetCategories ARRAY
                    Purchase purchaseToAdd = new Purchase
                    {
                        Id = p.Id,
                        BudgetId = p.BudgetId,
                        CategoryId = p.CategoryId,
                        PurchaseName = p.PurchaseName,
                        PurchaseTotal = p.PurchaseTotal,
                        PurchaseDate = p.PurchaseDate,
                        PaidOff = p.PaidOff
                    };

                    budgetPurchases.Add(purchaseToAdd);
                }

            }

            return budgetPurchases;

        }

        //ADD A PURCHASE TO AN ASSOCIATED USER BUDGET
        // POST api/<PurchasesController>
        [HttpPost]
        public void Post([FromBody] AddPurchaseDTO purchase)
        {

            //INITIALIZE USER BUDGET TO VERIFY IT BELONGS TO USER
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(purchase.userId) && b.Id == purchase.budgetId);
            //INITIALIZE USER CATEGORY TO VERIFY IT BELONGS TO USER
            var userCategory = _context.Categories.FirstOrDefault(c => c.Id == purchase.categoryId && c.BudgetId == purchase.budgetId);

            if (userBudget == null || userCategory == null)
            {
                throw new Exception();
            }
            else
            {

                //Convert purchase.purchaseDate from string into DateTime
                var stringDate = String.Join("", purchase.purchaseDate.Split('-'));
                var convertedDate = DateTime.ParseExact(stringDate, "yyyyMMdd", CultureInfo.InvariantCulture);


                //Add Purchase to database
                Purchase purchaseToAdd = new Purchase { BudgetId = purchase.budgetId, CategoryId = purchase.categoryId, PurchaseName = purchase.purchaseName, PurchaseTotal = purchase.purchaseTotal, PurchaseDate = convertedDate, PaidOff = false };

                _context.Purchases.Add(purchaseToAdd);
                userBudget.DateLastModified = DateTime.Now.Date;
                _context.SaveChanges();
            }

        }





        // PUT api/<PurchasesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PurchasesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
