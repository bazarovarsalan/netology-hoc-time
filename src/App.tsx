import  {useState} from 'react';
import './index.css'
import moment from 'moment';


interface list {
  url: string,
  date: string
}

type Props = { 
  list: list[]
}

type DateTimeProps = {
  date: string
}


function DateTimePrettyFoo<T extends DateTimeProps > (Component:React.ComponentType<T>) {
  return function (props: T) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const date1 = moment(props.date);
        const date2 = moment(now);

        const getDiff  = (a:moment.Moment, b:moment.Moment) => {
          let res:number ;
            if (+(b.diff(a, 'years')) >= 1) {
              res = b.diff(a, 'years')
              return `${res} years ago`
            } else if(+(b.diff(a, 'months')) >= 1){
              res = b.diff(a, 'months')
              return `${res} months ago`
            } else if(+(b.diff(a, 'days')) >= 1){
              res = b.diff(a, 'days')
              return `${res} days ago`
            } else if(+(b.diff(a, 'hours')) >= 1){
              res = b.diff(a, 'hours')
              return `${res} hours ago`
            } else if(+(b.diff(a, 'minutes')) >= 1){
              res = b.diff(a, 'minutes')
              return `${res} minutes ago`
            }
            return 'now'
        }
        let diff = getDiff(date1, date2)
        return <Component {...props} date={diff} /> 
  }
}



const DateTimePretty = DateTimePrettyFoo(DateTime);


function DateTime(props: {date:string}) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props: list) {
    return (
        <div className="video">
            <iframe src={props.url} style={{border: '0'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}
//** Так и не понял почему frameborder не типизируется, когда хочу поменять на frameBorder(так указано в типизации iframe)*/



function VideoList(props:Props) {
    return props.list.map(item => <Video key={item.url} url={item.url} date={item.date} />);
}


//Я изменил даты публикации для того чтобы отображались разные кейсы

export default function App() {
    const [list, _setList] = useState<list[]>([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2013-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2020-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-03-03 00:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-06-23 10:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-06-23 16:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}