import React, { Component } from 'react';
import './loop.css';
import axios from 'axios';
import 'animate.css';
import Loader from 'react-loader-spinner';




class Loopers extends Component {
    state = { 
        inputValue: '',
        links: [],
        otherLinks: {},
        loading: false
     }

    othersCick = (link) => {
        let url = 'https://loopers-api.herokuapp.com/'

        axios({
            method: 'post',
            url: url,
            data: {
              link: link
            }
          })
          .then(res => {
                let object = {}
                object[link] = Object.values(res.data)[0].links
                this.setState({otherLinks:object})
                console.log(Object.keys(this.state.otherLinks)[0] === link)
          })
          .catch(err => console.error(err))
    }

    eachOtherLinkCLicked = (item) => {
        return (
                <div className="col-md-10">
                {
                        { item }
                }
                </div>
        )
    }


    eachLink = (item) => {
        return (
            <div className="card shadow p-3 mb-3 animated pulse">
                <div className="row">
                <div className="col-md-10">
                { item }
                </div>
                </div>
            </div>
        )
    }

    handleSubmit = () => {
        let data = {link: this.state.inputValue}
        let url = 'https://loopers-api.herokuapp.com/'
        this.setState({loading: true})
        axios({
            method: 'post',
            url: url,
            data: {
              link: this.state.inputValue
            }
          })
          .then(res => {
            this.setState({links: Object.values(res.data)[0].links, loading:false})

          })
          .catch(err => console.error(err))

    }

    updateInputState = (e) => this.setState({inputValue: e.target.value})

    

    render() { 
        return (
            <div className="m-5">
    <div className="col-md-5 mx-auto text-center">
        <div className="">
            <h3 style={{ color: "gray"}}>Loopers</h3>
        </div>
        <span className="text-muted">Crawl websites for links</span>
    </div>

    <div className="row">
      <div className="col-md-8 mx-auto mt-5">
            <form>
                <div className="form-group mx-auto">
                    <input type="text" placeholder="Enter a url" className="mb-3" onChange={e => this.updateInputState(e) }/>
                    <div className="col-md-4 mx-auto">
                        <button type="button" className="btn btn-info btn-block" onClick={this.handleSubmit}>Crawl !</button>
                    </div>
                </div>
            </form>
            <div>
            <div className="text-success">
                {
                    this.state.links.length
                } &nbsp;
                 crawled
            </div>
                {
                    this.state.loading ? <div style={{width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }} >

                            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
                        </div> : this.state.links.map(this.eachLink)
                }
            </div>

        </div>
    </div>
    </div>
        );
    }
}
 
export default Loopers;