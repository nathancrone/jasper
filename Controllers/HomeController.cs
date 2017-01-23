using Jasper.EntityFramework;
using Jasper.Extensions;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Data.Entity;
using System.Threading.Tasks;
using Jasper.Models;
using Microsoft.Azure.NotificationHubs;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Jasper.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public async Task<JsonNetResult> JSON_TerritoryOutByUserId(string Id)
        {
            using (var context = new AppContext())
            {
                return this.JsonNet(await context.LedgerEntries.Where(a => a.UserId == Id && a.CheckInDate == null).Include(a => a.Territory).Include(a => a.User).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<JsonNetResult> JSON_TerritoryOut()
        {
            using (var context = new AppContext())
            {
                return this.JsonNet(await context.LedgerEntries.Where(a => a.CheckInDate == null).Include(a => a.Territory).Include(a => a.User).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<JsonNetResult> JSON_TerritoryIn()
        {
            using (var context = new AppContext())
            {
                //territories with no ledger entries
                var LinqResult = context.Territories.Where(a => !a.LedgerEntries.Any());

                //territories with no ledger entries that have a null checkin date
                LinqResult = LinqResult.Union(context.Territories.Where(a => !a.LedgerEntries.Any(b => b.CheckInDate == null)));

                return this.JsonNet(await LinqResult.Select(a => new { Territory = a, CheckInDate = a.LedgerEntries.Max(b => b.CheckInDate) }).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }


        public async Task<JsonNetResult> JSON_UserAll()
        {
            using (var context = new AppContext())
            {
                return this.JsonNet(await context.Users.ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public async Task<JsonNetResult> CheckOut(CheckOutViewModel data)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var context = new AppContext())
                    {
                        LedgerEntry entry = context.LedgerEntries.Create();

                        entry.TerritoryId = data.TerritoryId;
                        entry.UserId = data.UserId;
                        entry.CheckOutDate = data.CheckOutDate;

                        context.LedgerEntries.Add(entry);
                        await context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    return this.JsonNet(new { Error = true, Message = ex.Message });
                }
            }

            return this.JsonNet(new { Error = false, Message = "The territory was checked out." });
        }
    }
}