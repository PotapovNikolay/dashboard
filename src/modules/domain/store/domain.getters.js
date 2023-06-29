export default {

    userEmail: state=>id => state.entities.domains[0],

    domainByHost: state => host => state.entities.domainsByHost.find(domain=>domain.host===host)

}
