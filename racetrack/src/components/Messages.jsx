import { Component } from "react";
import "./css/style.css";

class Messages extends Component {

    state = {
        messages: [
            {
                id: 1,
                title: 'Message Title No. 1 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'
            },
            {
                id: 2,
                title: 'Message Title No. 2 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'

            },
            {
                id: 3,
                title: 'Message Title No. 3 Sample',
                datetime: '24.12.2022 17:53',
                author: 'Montrey',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis nisl quis congue mollis. Nullam vel ex et eros commodo viverra sed non nunc. Mauris blandit porttitor est a commodo. Curabitur suscipit, augue eget condimentum venenatis, risus mi interdum enim, vitae tempus sapien massa a massa....'
            },
        ],
        messagesConst: []
    }

    componentDidMount() {
        const messagesArray = this.state.messages.map(message => <Message key={message.id} title={message.title} date={message.datetime} author={message.author} content={message.content}/>)
        this.setState({
            messagesConst: messagesArray
        })

    }

    render() {

        return (
            <div className='messageDiv bg-bg'>
                {this.state.messagesConst}
            </div>
        )
    }
}

const Message = props => {
    return (
        <article className="message bg-bg">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div>
                <button>Read more...</button>
                <span>{props.date} by {props.author}</span>
            </div>
        </article>
    )
}
export {  Messages }