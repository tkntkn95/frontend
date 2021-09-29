import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {articles: [], kasse: [], vorschlaege: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/historie/articles')
            .then(response => response.json())
            .then(data => this.setState({articles: data}));

        fetch('/kasse/articles')
            .then(response => response.json())
            .then(data => this.setState({kasse: data}));

        fetch('/vorschlaege/articles')
            .then(response => response.json())
            .then(data => this.setState({vorschlaege: data}));

    }

    async remove(id) {
        await fetch(`/historie/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedArticles = [...this.state.articles].filter(i => i.id !== id);
            this.setState({articles: updatedArticles});

        });
        setTimeout(() => window.location.reload(), 1000);
    }

    render() {
        const {articles} = this.state;
        const {vorschlaege} = this.state;
        const {kasse} = this.state;

        const articleList = articles.map(article => {
            return <tr key={article.id}>
                <td style={{whiteSpace: 'nowrap'}}>{article.name}</td>
                <td>{article.price}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/articles/" + article.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(article.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
//-------------------------------------------------------------------------
      const articleListKasse = kasse.map(k => {
          return <tr key={k.id}>
              <td style={{whiteSpace: 'nowrap'}}>{k.name}</td>
              <td>{k.price}</td>
              <td>
              </td>
          </tr>
      });

      const articleListVorschlaege = vorschlaege.map(article => {
          return <tr key={article.id}>
              <td style={{whiteSpace: 'nowrap'}}>{article.name}</td>
              <td>{article.price}</td>
              <td>
              </td>
          </tr>
      });


//-------------------------------------------------------------------------
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/articles/new">Add Article</Button>
                    </div>
                    <h3> Historie-Articles</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Price</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {articleList}
                        </tbody>
                    </Table>
                    <h3><br/><br/><br/>Kasse-Articles </h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Price</th>
                            <th width="40%"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {articleListKasse}
                        </tbody>
                    </Table>
                    <h3><br/><br/><br/>Vorchläge-Articles </h3>
                      <Table className="mt-4">
                          <thead>
                          <tr>
                              <th width="30%">Name</th>
                              <th width="30%">Price</th>
                              <th width="40%"></th>
                          </tr>
                          </thead>
                          <tbody>
                          {articleListVorschlaege }
                          </tbody>
                      </Table>
                </Container>
            </div>
        );
    }
}
export default ArticleList;
