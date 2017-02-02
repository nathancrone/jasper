using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Jasper.Models
{
    public class CheckOutViewModel
    {
        public int TerritoryId { get; set; }
        public string UserId { get; set; }
        public DateTime? CheckOutDate { get; set; }
    }

    public class CheckOutUserViewModel
    {
        public int TerritoryId { get; set; }
        public DateTime? CheckOutDate { get; set; }
    }

    public class CheckInViewModel
    {
        public int TerritoryId { get; set; }
        public DateTime? CheckInDate { get; set; }
    }
}