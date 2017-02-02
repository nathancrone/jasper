using Jasper.EntityFramework;
using Jasper.Extensions;
using Jasper.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Jasper.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public async Task<JsonNetResult> JSON_TerritoryOutByUser()
        {
            using (var context = new AppContext())
            {
                string UserId = User.Identity.GetUserId();
                return this.JsonNet(await context.LedgerEntries.Where(a => a.UserId == UserId && a.CheckInDate == null).Include(a => a.Territory).Include(a => a.User).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
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
                return this.JsonNet(await context.LedgerEntries.Where(a => a.CheckInDate == null && !a.Territory.InActive).Include(a => a.Territory).Include(a => a.User).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<JsonNetResult> JSON_TerritoryIn()
        {
            using (var context = new AppContext())
            {
                //territories with no ledger entries
                var LinqResult = context.Territories.Where(a => !a.InActive && !a.LedgerEntries.Any());

                //territories with ledger entries that have a null checkin date
                LinqResult = LinqResult.Union(context.Territories.Where(a => !a.InActive && !a.LedgerEntries.Any(b => b.CheckInDate == null)));

                return this.JsonNet(await LinqResult.Select(a => new { Territory = a, CheckInDate = a.LedgerEntries.Max(b => b.CheckInDate) }).ToListAsync(), JsonRequestBehavior.AllowGet);
            }
        }

        public async Task<JsonNetResult> JSON_TerritoryInOldest()
        {
            using (var context = new AppContext())
            {
                //territories with no ledger entries
                var LinqResult = context.Territories.Where(a => !a.InActive && !a.LedgerEntries.Any());

                //territories with ledger entries that have a null checkin date
                LinqResult = LinqResult.Union(context.Territories.Where(a => !a.InActive && !a.LedgerEntries.Any(b => b.CheckInDate == null)));
                
                //sort by the checkin date and take take the top 3
                return this.JsonNet(await LinqResult.Select(a => new { Territory = a, CheckInDate = a.LedgerEntries.Max(b => b.CheckInDate) }).OrderBy(x => x.CheckInDate).Take(3).ToListAsync(), JsonRequestBehavior.AllowGet);
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

                        entry.CheckOutDate = (data.CheckOutDate == null) ? DateTime.Now : data.CheckOutDate;

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


        [HttpPost]
        public async Task<JsonNetResult> CheckOutUser(CheckOutUserViewModel data)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string UserId = User.Identity.GetUserId();

                    using (var context = new AppContext())
                    {
                        LedgerEntry entry = context.LedgerEntries.Create();

                        entry.TerritoryId = data.TerritoryId;
                        entry.UserId = UserId;
                        entry.CheckOutDate = (data.CheckOutDate == null) ? DateTime.Now : data.CheckOutDate;

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


        [HttpPost]
        public async Task<JsonNetResult> CheckIn(CheckInViewModel data)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    using (var context = new AppContext())
                    {
                        LedgerEntry entry = await context.LedgerEntries.OrderByDescending(x => x.CheckOutDate).SingleOrDefaultAsync(x => x.TerritoryId == data.TerritoryId && x.CheckInDate == null);
                        if (entry != null)
                        {
                            entry.CheckInDate = (data.CheckInDate == null) ? DateTime.Now : data.CheckInDate;
                            await context.SaveChangesAsync();
                        }
                    }
                }
                catch (Exception ex)
                {
                    return this.JsonNet(new { Error = true, Message = ex.Message });
                }
            }

            return this.JsonNet(new { Error = false, Message = "The territory was checked out." });
        }

        public async Task<ActionResult> ViewTerritory(int Id)
        {
            string Path = "";

            try
            {
                using (var context = new AppContext())
                {
                    Territory T = await context.Territories.FindAsync(Id);
                    Path = T.Path;
                }
            }
            catch (Exception ex)
            {
                return this.JsonNet(new { Error = true, Message = ex.Message });
            }
            
            return (Path == "") ? Redirect("http://gvty.azurewebsites.net/") : Redirect(string.Format("http://gvty.azurewebsites.net/Home/Map?path={0}", Server.UrlEncode(Path)));
        }

        [Authorize(Roles = "Admin")]
        public ActionResult DownloadDb()
        {
            byte[] fileBytes = System.IO.File.ReadAllBytes(Server.MapPath("~/App_Data/JasperDB.db"));
            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, "JasperDB.db");
        }
    }
}