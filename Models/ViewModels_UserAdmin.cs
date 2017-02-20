using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Jasper.Models
{
    public class EditUserViewModel
    {
        public string Id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }

        public IEnumerable<SelectListItem> RolesList { get; set; }
    }
}