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

        //POPULATE A USERS CATEGORIES FOR THEIR SELECTED BUDGET
        // GET api/<CategoriesController>/5
        [HttpGet("{userId}/{budgetId}")]
        public IEnumerable<Category> Get(string userId, int budgetId)
        {
            //INITIALIZE EMPTY ARRAY OF CATEGORIES
            var budgetCategories = new List<Category>();

            //INITIALIZE USER BUDGET
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
                    //ADD ALL CATEGORIES ASSOCIATED TO THE USER BUDGET INTO BudgetCategories ARRAY
                    Category categoryToAdd = new Category
                    {
                        Id = c.Id,
                        BudgetId = c.BudgetId,
                        CategoryName = c.CategoryName,
                        CategoryTotal = c.CategoryTotal
                    };

                    budgetCategories.Add(categoryToAdd);
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
                    CategoryTotal = category.categoryLimit
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
            var userBudget = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(category.userId) && b.Id == category.budgetId);

            if (userBudget == null)
            {
                throw new Exception();
            }
            else
            {
                //MODIFY THE DateLastModified FIELD FOR THE USER'S SELECTED BUDGET
                userBudget.DateLastModified = DateTime.Now.Date;

                var categoryToDelete = _context.Categories.FirstOrDefault(c => c.Id == category.categoryId && c.BudgetId == category.budgetId);
                if (categoryToDelete != null)
                {
                    _context.Categories.Remove(categoryToDelete);
                    _context.SaveChanges();
                }

            }

        }
    }
}
