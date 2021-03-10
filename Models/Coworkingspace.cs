using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MapApp.Models
{
    public class Coworkingspace
    {
        [Key]
        public int Cw_id { get; set; }

        [Column(TypeName = "varchar(200)")]
        [Required]
        public string Name { get; set; }

        [Required]
        public float Lon { get; set; }

        [Required]
        public float Lat { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Url { get; set; }

        [Column(TypeName = "varchar(200)")]
        public string Descirption { get; set; }

        [Required]
        public int Area_id { get; set; }

        [Required]
        public int Station_id { get; set; }

        [Required]
        public bool Has_FreeDrink { get; set; }

        [Required]
        public bool Is_RecentCreated { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

    }
}
