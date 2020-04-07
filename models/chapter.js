import moment from 'moment'
class Chapter {

    constructor(id,title,group,start_date,end_date,creator){
        this.id=id;
        this.title=title;
        this.group=group;
        this.start_date=start_date;
        this.end_date=end_date;
        this.creator=creator
    }
    get startDate(){
        return moment(this.start_date).format('MMMM Do YYYY')
       } 
   get endDate(){
        return moment(this.end_date).format('MMMM Do YYYY')
       }        
        
}
export default Chapter