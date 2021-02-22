/*
 * @Author: wqjiao 
 * @Date: 2018-12-19 17:30:12 
 * @Last Modified by: wqjiao
 * @Last Modified time: 2021-02-22 15:57:23
 * @Description: editor web 富文本编辑器 
 */
import React, { Component, Fragment, createRef } from "react";
import { Select } from 'antd';
import './index.less';

const Option = Select.Option;

class WqjiaoEditor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            editorIcons: [{
                id: 'choose-all',
                text: '全选',
                event: this.chooseAll
            }, {
                id: 'copy',
                text: '复制',
                event: this.copy
            }, {
                id: 'cut',
                text: '剪切',
                event: this.cut
            }, {
                id: 'bold',
                text: '加粗',
                event: this.bold
            }, {
                id: 'italic',
                text: '斜体',
                event: this.italic
            }, {
                id: 'font-size',
                text: '字体大小',
                event: this.fontSize
            }, {
                id: 'underline',
                text: '下划线',
                event: this.underline
            }, {
                id: 'background-color',
                text: '背景色',
                event: this.backgroundColor
            }],
            fontSizeOption: [],
            isShow: false
        }
    }

    document = createRef(null);

    componentDidMount() {
        this.editor = this.document.current.contentDocument;
        this.editor.designMode = 'On';
        this.editor.contentEditable = true;

        let fontSizeOption = [];
        // 字体大小数组
        for (let i = 10; i <= 24; i ++) {
            fontSizeOption.push(i);                                                
        }

        console.log('fontSizeOption:', fontSizeOption)

        this.setState({
            fontSizeOption
        });
    }

    // 全选
    chooseAll = () => {
        this.editor.execCommand('selectAll');
    }

    // 复制
    copy = () => {
        this.editor.execCommand('copy');
    }

    // 剪切
    cut = () => {
        this.editor.execCommand('cut');
    }

    // 加粗
    bold = () => {
        this.editor.execCommand('bold');
    }

    // 斜体
    italic = () => {
        this.editor.execCommand('italic');
    }

    // 字体大小
    fontSize = () => {
        let me = this;     
    }

    onClick() {
        this.setState({
            isShow: true
        });
    }

    onChange(value) {
        this.setState({
            isShow: false
        })
        this.editor.execCommand('fontSize', true, value);
    }

    // 下划线
    underline = () => {
        this.editor.execCommand('underline');
    }

    // 背景色
    backgroundColor = () => {
        this.editor.execCommand('hiliteColor', true, 'red');
    }

    render() {
        let me = this;

        return (
            <Fragment>
                <div className="wqjiao-editor">
                    <div className="wqjiao-editor-icon">
                        <ul className="wqjiao-icon-list clearfix">
                            {
                                me.state.editorIcons && me.state.editorIcons.map((item, index) => {
                                    return (
                                        <li className="wqjiao-icon-item" onClick={item.event} key={'editor' + index}>
                                            <i
                                                className={"wqjiao-i i-" + item.id}
                                                title={item.text}
                                                alt={item.text}
                                                onClick={me.onClick.bind(me)}
                                            />
                                            { (item.id === 'font-size' && me.state.isShow) && <div className="wqjiao-editor-select">
                                                <Select style={{width: '100%'}} defaultValue='14' onChange={me.onChange.bind(me)}>
                                                    {
                                                        me.state.fontSizeOption && me.state.fontSizeOption.map((item, index) => {
                                                            return (
                                                                <Option key={'fontSize' + index} value={item}>{item}</Option>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </div> }
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <iframe ref={this.document} className="wqjiao-editor-textarea" frameborder="0"></iframe>
                </div>
            </Fragment>
        )
    }
}

export default WqjiaoEditor;
