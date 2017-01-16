using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Jasper.Models
{

    public class Territory
    {
        public int TerritoryId { get; set; }
        public string TerritoryCode { get; set; }

        public string Path { get; set; }

        public bool InActive { get; set; }

        public ICollection<LedgerEntry> LedgerEntries { get; set; }
    }

    public class LedgerEntry
    {
        public int LedgerEntryId { get; set; }

        public int TerritoryId { get; set; }

        public string UserId { get; set; }

        public DateTime? CheckOutDate { get; set; }

        public DateTime? CheckInDate { get; set; }

        public Territory Territory { get; set; }

        public AppUser User { get; set; }
    }
}