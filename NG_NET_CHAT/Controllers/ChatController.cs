using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NG_NET_CHAT.Hubs;

namespace NG_NET_CHAT.Controllers
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