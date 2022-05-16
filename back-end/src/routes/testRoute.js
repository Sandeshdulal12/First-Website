
const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: (req,res) => {
        res.status(200).send("Mt first server is working!!!");
    }
}
export default testRoute