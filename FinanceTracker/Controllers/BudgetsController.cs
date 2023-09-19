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
        public IEnumerable<Budget> Post([FromBody] AddBudgetDTO value)
        {
            //Create and save new budget to database
            Budget budgetToAdd = new Budget { UserId = value.userID, BudgetName = value.budgetName };
            _context.Budgets.Add(budgetToAdd);
            _context.SaveChanges();

            //Return updated budget list 
            var budgets = _context.Budgets.Where(b => b.UserId.Equals(value.userID)).ToList();
            return budgets;
        }

        // PUT api/<BudgetsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BudgetsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
