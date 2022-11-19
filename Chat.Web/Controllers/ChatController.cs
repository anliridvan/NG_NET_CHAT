using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Chat.Web.Hubs;

namespace Chat.Web.Controllers
{
    public class ChatController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<ChatController> _logger;

        private readonly IHubContext<ChatHub> _chatHub;

        public ChatController(ILogger<ChatController> logger, IHubContext<ChatHub> chatHub)
        {
            _logger = logger;
            _chatHub = chatHub;
        }


    }
}