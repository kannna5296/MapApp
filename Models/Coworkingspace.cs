using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapApp.Models
{
    public class Coworkingspace
    {
        public int Cw_id { get; set; }
        public string Name { get; set; }
        public float Lon { get; set; }
        public float Lat { get; set; }
        public string Url { get; set; }
        public string Descirption { get; set; }
        public int Area_id { get; set; }
        public int Station_id { get; set; }
        public bool Has_FreeDrink { get; set; }
        public bool Is_RecentCreated { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }

    }
}
