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

        //RETURN A USERS BUDGETS
        // GET api/<BudgetsController>/5
        [HttpGet("{userID}")]
        public IEnumerable<Budget> Get(string userID)
        {
            var budgets = _context.Budgets.Where(b => b.UserId.Equals(userID)).ToList();
            return budgets;
        }

        // POST api/<BudgetsController>
        [HttpPost]
        public void Post([FromBody] AddBudgetDTO value)
        {
            var budgetToAdd = new AddBudgetDTO { userID = value.userID, budgetName = value.budgetName };
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
