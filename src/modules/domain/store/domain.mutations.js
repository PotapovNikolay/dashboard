export default {



    setDomains(state, domains){

        state.entities.domains = domains
    },

    setDomainByHost(state, domain){

        state.entities.domainsByHost.push(domain)
    },

    deleteDomainByHost(state, host){

        state.entities.domainsByHost = state.entities.domainsByHost.filter(domain=>domain.host=== host)
    },
}
