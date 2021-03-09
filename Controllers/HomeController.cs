﻿using GoogleMap.Models;
using MapApp.Context;
using MapApp.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMap.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly MyDatabaseContext _context;

        public HomeController(ILogger<HomeController> logger, MyDatabaseContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetCW()
        {
            CoworkingSpaceService service = new CoworkingSpaceService();
            return View();
        }
    }
}
