using Microsoft.AspNet.Identity.EntityFramework;
using Jasper.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace Jasper.EntityFramework
{
    public class AppContext : IdentityDbContext<AppUser>
    {
        private static string GetConnection(string ConnectionString)
        {
            return ConnectionString.Replace("~", System.Web.HttpContext.Current.Server.MapPath("~"));
        }

        //IdentityUser
        //IdentityRole
        //IdentityUserClaim
        public DbSet<Territory> Territories { get; set; }
        public DbSet<LedgerEntry> LedgerEntries { get; set; }

        public AppContext() : base("name=JasperDB", throwIfV1Schema: false)
        {
            Database.Connection.ConnectionString = GetConnection(Database.Connection.ConnectionString);
            Database.SetInitializer<AppContext>(null);
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public static AppContext Create()
        {
            return new AppContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasDefaultSchema("dbo");

            //Territory configuration
            modelBuilder.Entity<Territory>().HasKey(x => x.TerritoryId);

            modelBuilder.Entity<Territory>()
                .ToTable("tblTerritories")
                .Property(x => x.TerritoryId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Territory>()
                .Property(x => x.TerritoryCode)
                .IsRequired();

            modelBuilder.Entity<Territory>()
                .HasMany(x => x.LedgerEntries)
                .WithRequired(x => x.Territory);



            //LedgerEntry configuration
            modelBuilder.Entity<LedgerEntry>().HasKey(x => x.LedgerEntryId);

            modelBuilder.Entity<LedgerEntry>()
                .ToTable("tblLedgerEntries")
                .Property(x => x.LedgerEntryId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<LedgerEntry>()
                .Property(x => x.TerritoryId)
                .IsRequired();

            modelBuilder.Entity<LedgerEntry>()
                .Property(x => x.UserId)
                .IsRequired();

            //CheckOutDate = c.DateTime(nullable: false, defaultValueSql: "GETDATE()"),

            //AppUser configuration
            modelBuilder.Entity<AppUser>().ToTable("tblUsers").Property(p => p.Id).HasColumnName("UserId");

            modelBuilder.Entity<AppUser>()
                .HasMany(x => x.LedgerEntries)
                .WithRequired(x => x.User).HasForeignKey(x => x.UserId);

            //IdentityUser configuration
            var user = modelBuilder.Entity<IdentityUser>().ToTable("tblUsers");
            user.Property(p => p.Id).HasColumnName("UserId");
            user.HasMany(u => u.Roles).WithRequired().HasForeignKey(ur => ur.UserId);
            user.HasMany(u => u.Claims).WithRequired().HasForeignKey(uc => uc.UserId);
            user.HasMany(u => u.Logins).WithRequired().HasForeignKey(ul => ul.UserId);
            user.Property(u => u.UserName).IsRequired();

            //IdentityUserRole configuration
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.UserId, r.RoleId }).ToTable("tblUserRoles");

            //IdentityUserLogin configuration
            modelBuilder.Entity<IdentityUserLogin>().HasKey(l => new { l.UserId, l.LoginProvider, l.ProviderKey }).ToTable("tblUserLogins");

            //IdentityUserClaim configuration
            modelBuilder.Entity<IdentityUserClaim>().ToTable("tblUserClaims");

            //AppRole configuration
            modelBuilder.Entity<AppRole>().ToTable("tblRoles").Property(p => p.Id).HasColumnName("RoleId");
            var role = modelBuilder.Entity<IdentityRole>().ToTable("tblRoles");
            role.Property(p => p.Id).HasColumnName("RoleId");
            role.Property(r => r.Name).IsRequired();
            role.HasMany(r => r.Users).WithRequired().HasForeignKey(ur => ur.RoleId);
        }
    }
}