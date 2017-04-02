using Jasper.EntityFramework;
using Jasper.Extensions;
using Jasper.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
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

        [HttpPost]
        public async Task<JsonNetResult> Rework(ReworkViewModel data)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string UserId = User.Identity.GetUserId();

                    using (var context = new AppContext())
                    {
                        LedgerEntry entry1 = await context.LedgerEntries.OrderByDescending(x => x.CheckOutDate).SingleOrDefaultAsync(x => x.TerritoryId == data.TerritoryId && x.UserId == UserId && x.CheckInDate == null);
                        if (entry1 != null)
                        {
                            entry1.CheckInDate = DateTime.Now;
                            await context.SaveChangesAsync();
                            
                            LedgerEntry entry2 = context.LedgerEntries.Create();
                            entry2.TerritoryId = data.TerritoryId;
                            entry2.UserId = UserId;
                            entry2.CheckOutDate = DateTime.Now;

                            context.LedgerEntries.Add(entry2);
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

        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Report()
        {
            using (var context = new AppContext())
            {
                var LinqResult = context.Territories.Where(a => !a.InActive && !a.LedgerEntries.Any());
                LinqResult = LinqResult.Union(context.Territories.Where(a => !a.InActive).Include(a => a.LedgerEntries).Include(a => a.LedgerEntries.Select(b => b.User)));

                var data1 = await LinqResult.OrderBy(a => a.TerritoryCode).Skip(0).Take(5).Select(a => new { TerritoryCode = a.TerritoryCode, LedgerEntries = a.LedgerEntries.Select(b => new { FirstName = b.User.FirstName, LastName = b.User.LastName, CheckOutDate = b.CheckOutDate, CheckInDate = b.CheckInDate }) }).ToListAsync();

                List <ReportLedgerData> data2 = new List<ReportLedgerData>();

                List<ReportParameter> ReportParams = new List<ReportParameter>();
                int Index1 = 0;
                foreach (var x in data1.ToList())
                {
                    ReportParams.Add(new ReportParameter(string.Format("Col{0}_Header", Index1 + 1), x.TerritoryCode.ToUpper()));

                    int Index2 = 0;
                    foreach (var y in x.LedgerEntries.ToList().OrderBy(a => a.CheckOutDate))
                    {
                        if (data2.Count() < (Index2 + 1))
                        {
                            data2.Add(new ReportLedgerData());
                        }

                        if (Index1 == 0)
                        {
                            data2[Index2].Col1_Publisher = string.Format("{0} {1}", y.FirstName, y.LastName);
                            data2[Index2].Col1_DateOut = string.Format("{0:MM/dd/yyyy}", y.CheckOutDate);
                            data2[Index2].Col1_DateIn = string.Format("{0:MM/dd/yyyy}", y.CheckInDate);
                        }
                        else if (Index1 == 1)
                        {
                            data2[Index2].Col2_Publisher = string.Format("{0} {1}", y.FirstName, y.LastName);
                            data2[Index2].Col2_DateOut = string.Format("{0:MM/dd/yyyy}", y.CheckOutDate);
                            data2[Index2].Col2_DateIn = string.Format("{0:MM/dd/yyyy}", y.CheckInDate);
                        }
                        else if (Index1 == 2)
                        {
                            data2[Index2].Col3_Publisher = string.Format("{0} {1}", y.FirstName, y.LastName);
                            data2[Index2].Col3_DateOut = string.Format("{0:MM/dd/yyyy}", y.CheckOutDate);
                            data2[Index2].Col3_DateIn = string.Format("{0:MM/dd/yyyy}", y.CheckInDate);
                        }
                        else if (Index1 == 3)
                        {
                            data2[Index2].Col4_Publisher = string.Format("{0} {1}", y.FirstName, y.LastName);
                            data2[Index2].Col4_DateOut = string.Format("{0:MM/dd/yyyy}", y.CheckOutDate);
                            data2[Index2].Col4_DateIn = string.Format("{0:MM/dd/yyyy}", y.CheckInDate);
                        }
                        else if (Index1 == 4)
                        {
                            data2[Index2].Col5_Publisher = string.Format("{0} {1}", y.FirstName, y.LastName);
                            data2[Index2].Col5_DateOut = string.Format("{0:MM/dd/yyyy}", y.CheckOutDate);
                            data2[Index2].Col5_DateIn = string.Format("{0:MM/dd/yyyy}", y.CheckInDate);
                        }
                        Index2++;
                    }
                    Index1++;
                }

                var reportDataSource = new ReportDataSource { Name = "DataSet1", Value = data2 };

                ReportViewer viewer = new ReportViewer();
                viewer.ProcessingMode = ProcessingMode.Local;
                viewer.LocalReport.ReportEmbeddedResource = "Jasper.ReportLedger.rdlc";

                viewer.LocalReport.SetParameters(ReportParams.ToArray());

                viewer.LocalReport.DataSources.Clear();
                viewer.LocalReport.DataSources.Add(reportDataSource);
                viewer.LocalReport.Refresh();

                // Variables
                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = viewer.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamIds, out warnings);

                MemoryStream PdfStream = new MemoryStream();

                try
                {
                    PdfStream.Write(bytes, 0, bytes.Length);
                    PdfStream.Flush();
                    PdfStream.Position = 0;
                    return File(PdfStream, "application/pdf", "Report.pdf");
                }
                catch
                {
                    PdfStream.Dispose();
                    throw;
                }
            }
        }
    }
}