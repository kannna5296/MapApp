using MapApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapApp.Context
{
    public class CoworkingspaceContext : DbContext
    {
        public CoworkingspaceContext(DbContextOptions<CoworkingspaceContext> options) : base(options)
        {
        }

        public DbSet<Coworkingspace> Coworkingspace{ get; set; }
    }
}
