using Limb_Mission10.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Limb_Mission10.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private ITeamRepository _teamRepository;
        public TeamController (ITeamRepository temp)
        {
            _teamRepository = temp;
        }


        public IEnumerable<Team> Get()
        {
            var teamData = _teamRepository.Teams
                .Where(x => ((x.TeamName == "Marlins") || (x.TeamName == "Sharks")))
                .ToArray();

            return teamData;
        }

    }
}
