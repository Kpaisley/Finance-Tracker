using FinanceTracker.Data;
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


        // GET api/<CategoriesController>/5
        [HttpGet("{userId}/{budgetId}")]
        public IEnumerable<Category> Get(string userId, int budgetId)
        {
            //INITIALIZE LIST OF EMPTY CATEGORIES
            var budgetCategories = new List<Category>();

            //RETURN ALL BUDGETS BELONGING TO A USER TO ENSURE THE SELECTED BUDGET BELONGS TO THE USER
            var userBudgets = _context.Budgets.Where(b => b.UserId.Equals(userId)).ToList();
            

            //LOOP THROUGH ALL USER BUDGETS AND GRAB ONTO THEIR SELECTED BUDGET
            foreach (var b in userBudgets)
            {
                if (b.Id == budgetId)
                {
                    //LOAD ALL CATEGORIES RELATED TO THE USERS SELECTED BUDGET
                    _context.Entry(b).Collection(p => p.Categories).Load();
                    foreach (Category c in b.Categories)
                    {
                        Category categoryToAdd = new Category { Id = c.Id, BudgetId = c.BudgetId, CategoryName = c.CategoryName,
                                                                CategoryTotal = c.CategoryTotal };
                        budgetCategories.Add(categoryToAdd);
                    }
                    break;
                }
            }

            return budgetCategories;




            

        }

        // POST api/<CategoriesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
