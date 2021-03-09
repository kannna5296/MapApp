using MapApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapApp.Context
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext(DbContextOptions<MyDatabaseContext> options) : base(options)
        {
        }

        public MyDatabaseContext()
        {

        }

        public virtual DbSet<Coworkingspace> Coworkingspaces{ get; set; }
    }
}
