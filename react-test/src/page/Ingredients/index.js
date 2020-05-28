import React, { Component } from 'react';
import { connect } from "react-redux";
import SortableList from "../../component/SortableList";
import * as actions from "../../store/action";
import { Col, Button, Row, Input } from 'antd';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';

class Ingredients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newItemToggle: false,
            ingredientText: ''
        }
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.props.onMoveIngredients(oldIndex, newIndex);
    };

    handleNewItem = () => {
        this.setState(prevState => {
            return { newItemToggle: !prevState.newItemToggle }
        });
    };

    handleEnterIngredient = () => {
        this.setState({ newItemToggle: false });
        this.props.onAddIngredients(this.state.ingredientText);
    };

    handleAddIngredientText = (e) => {
        this.setState({ ingredientText: e.target.value })
    }

    render() {
        const { newItemToggle } = this.state;
        return (
            <Row>
                <Col span={4}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={newItemToggle ? <EllipsisOutlined /> : <PlusOutlined />}
                        size='large'
                        onClick={this.handleNewItem}
                    />
                </Col>
                <Col span={12}>
                    {
                        newItemToggle &&
                        <Row>
                            <Input
                                placeholder="New Ingredient"
                                onChange={this.handleAddIngredientText}
                                onPressEnter={this.handleEnterIngredient}
                            />
                        </Row>
                    }
                    <Row>
                        <SortableList items={this.props.ingredients} on onSortEnd={this.onSortEnd} />
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.allIngredients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.populateIngredients()),
        onMoveIngredients: (oldIndex, newIndex) => dispatch(actions.moveIngredients(oldIndex, newIndex)),
        onAddIngredients: (name) => dispatch(actions.addIngredient(name)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);

