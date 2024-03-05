using FinanceTracker.Data;
using FinanceTracker.Data.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BudgetsController : ControllerBase
    {
        private readonly BudgetFlowContext _context;

        public BudgetsController(BudgetFlowContext context)
        {
            _context = context;
        }

        //RETURN A USERS BUDGETS FROM THE DATABASE
        // GET api/<BudgetsController>/5
        [HttpGet("{userID}")]
        public IEnumerable<Budget> Get(string userID)
        {
            var budgets = _context.Budgets.Where(b => b.UserId.Equals(userID)).ToList();
            return budgets;
        }

        //ADD A NEW BUDGET TO THE DATABASE
        // POST api/<BudgetsController>
        [HttpPost]
        public void Post([FromBody] AddBudgetDTO value)
        {
            var userBudgets = _context.Budgets.Where(b => b.UserId.Equals(value.userId)).ToList();

            //Verify that user has a maximum of 3 budgets
            if (userBudgets.Count <= 2)
            {
                //Create and save new budget to database
                Budget budgetToAdd = new Budget
                {
                    UserId = value.userId,
                    BudgetName = value.budgetName,
                    DateCreated = DateTime.Now.Date,
                    DateLastModified = DateTime.Now.Date
                };
                _context.Budgets.Add(budgetToAdd);
                _context.SaveChanges();
            }
        }



        //PUT api/<BudgetsController>/5
        [HttpPut]
        public void Put([FromBody] ModifyBudgetDTO budget)
        {
            //Initialize the budget that will be modified
            var budgetToModify = _context.Budgets.FirstOrDefault(b => b.UserId.Equals(budget.userId) && b.Id == budget.budgetId);

            if (budgetToModify == null)
            {
                throw new Exception();
            }

            budgetToModify.BudgetName = budget.budgetName;
            budgetToModify.DateLastModified = DateTime.Now.Date;

            _context.SaveChanges();
        }




        //DELETE A BUDGET AND ITS RELATED CATEGORIES FROM THE DATABASE
        // DELETE api/<BudgetsController>/5
        [HttpDelete]
        public void Delete([FromBody] DeleteBudgetDTO budget)
        {
            var budgetToDelete = _context.Budgets.FirstOrDefault(b => b.Id == budget.budgetId && b.UserId == budget.userId);

            //Verify that the budget belongs to the user
            if (budgetToDelete == null) {
                throw new Exception();
            }

        
            //Remove all categories linked to the Budget ID
            var categoriesToDelete = _context.Categories.Where(c => c.BudgetId == budgetToDelete.Id).ToList();
            _context.Categories.RemoveRange(categoriesToDelete);

            //Remove the budget
            _context.Budgets.Remove(budgetToDelete);
            _context.SaveChanges();
            
        }
    }
}
