using FinanceTracker.Data;
using FinanceTracker.Data.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly BudgetFlowContext _context;

        public CategoriesController(BudgetFlowContext context)
        {
            _context = context;
        }

        //POPULATE A USERS CATEGORIES WIHTIN THEIR ASSOCIATED BUGDET FOR THE SPECIFIED MONTH
        // GET api/<CategoriesController>/5
        [HttpGet("{userId}/{budgetId}/{month}/{year}")]
        public IEnumerable<Category> Get(string userId, int budgetId, int month, int year)
        {
            //INITIALIZE EMPTY ARRAY OF CATEGORIES
            var budgetCategories = new List<Category>();

            //INITIALIZE USER BUDGET & VERIFY IT BELONGS TO THE USER
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(userId) && b.Id == budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
            {
                //LOAD ALL CATEGORIES ASSOCIATED TO THE USER BUDGET
                _context.Entry(userBudget).Collection(b => b.Categories).Load();

                foreach (Category c in userBudget.Categories)
                {

                    //FILTER OUT CATEGORIES THAT HAVE BEEN CREATED AFTER THE GIVEN MONTH/YEAR   (Ex. JANUARY WILL NOT POPULATE CATEGORIES CREATED IN FEBRURARY ONWARDS)
                    if (c.CategoryDate.Year <= year && c.CategoryDate.Month <= (month + 1))
                    {
                        //ADD ALL CATEGORIES ASSOCIATED TO THE USER BUDGET INTO BudgetCategories ARRAY
                        Category categoryToAdd = new Category
                        {
                            Id = c.Id,
                            BudgetId = c.BudgetId,
                            CategoryName = c.CategoryName,
                            CategoryTotal = c.CategoryTotal,
                            CategoryDate = c.CategoryDate,
                        };

                        budgetCategories.Add(categoryToAdd);
                    }

                }

            }


            return budgetCategories;


        }

        //ADD A CATEGORY TO A USER'S BUDGET
        // POST api/<CategoriesController>
        [HttpPost]
        public void Post([FromBody] AddCategoryDTO category)
        {
            //INITIALIZE USER BUDGET THAT THE CATEGORY WILL BE ADDED TO
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(category.userId) && b.Id == category.budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
            {
                //MODIFY THE DateLastModified FIELD FOR THE USER'S SELECTED BUDGET
                userBudget.DateLastModified = DateTime.Now.Date;

                //CREATE NEW CATEGORY TO SAVE TO THE DATABASE
                var categoryToAdd = new Category {
                    BudgetId = userBudget.Id,
                    CategoryName = category.categoryName,
                    CategoryTotal = category.categoryLimit,
                    CategoryDate = DateTime.Now.Date
            };
                _context.Categories.Add(categoryToAdd);
                _context.SaveChanges();
            }

        }

        //MODIFY A CATEGORY FROM A USER'S BUDGET
        // PUT api/<CategoriesController>/5
        [HttpPut]
        public void Put([FromBody] ModifyCategoryDTO category)
        {
            //INITIALIZE USER BUDGET THAT THE CATEGORY WILL BE MODIFIED FROM
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(category.userId) && b.Id == category.budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
            {
                //MODIFY THE DateLastModified FIELD FOR THE USER'S SELECTED BUDGET
                userBudget.DateLastModified = DateTime.Now.Date;

                var categoryToModify = _context.Categories.FirstOrDefault(c => c.BudgetId == category.budgetId && c.Id == category.categoryId);
                if (categoryToModify != null) {

                    categoryToModify.CategoryName = category.categoryName;
                    categoryToModify.CategoryTotal = category.categoryLimit;
                    _context.SaveChanges();
                }
                
            }
        }

        //DELETE A CATEGORY FROM A USER'S BUDGET
        // DELETE api/<CategoriesController>/5
        [HttpDelete]
        public void Delete([FromBody] DeleteCategoryDTO category)
        {
            //VERIFY THE CATEGORY BELONGS TO THE USERS BUDGET
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(category.userId) && b.Id == category.budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
             {
                
                var categoryToDelete = _context.Categories.FirstOrDefault(c => c.Id == category.categoryId && c.BudgetId == category.budgetId);
                if (categoryToDelete != null)
                {
                    //DELETE PURCHASES RELATED TO THE CATEGORY
                    var purchasesToDelete = _context.Purchases.Where(p => p.CategoryId == categoryToDelete.Id);
                    _context.RemoveRange(purchasesToDelete);

                    //DELETE CATEGORY
                    _context.Categories.Remove(categoryToDelete);

                    //MODIFY THE DateLastModified FIELD FOR THE USER'S SELECTED BUDGET
                    userBudget.DateLastModified = DateTime.Now.Date;


                    _context.SaveChanges();
                }

            }

        }
    }
}
