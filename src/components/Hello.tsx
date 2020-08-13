import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Child } from './Child';

export interface Props {
    name: string
    enthusiasmLevel?: number,    // ?代表可选项，可传可不传
    onIncrement?: ()=> void,
    onDecrement?: ()=> void,
    getPCount?: ()=> void,
    getDCount?: ()=> void
}

interface State {
    enthusiasmLevel: number,
    count: number
}

export class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        if((props.enthusiasmLevel || 0) <= 0){
            throw new Error("You could be a little more enthusiastic. :D")
        }
        
        this.state = {
            count: 0,
            enthusiasmLevel: props.enthusiasmLevel || 1
        }
    }

    //声明只读属性state
    // public readonly state: Readonly<State> = {
    //     count: 0,
    //     enthusiasmLevel: this.props.enthusiasmLevel || 1
    // }
    onIncrement = () => this.setState({ enthusiasmLevel: this.state.enthusiasmLevel +1 })
    onDecrement = () => this.setState({ enthusiasmLevel: Math.max(0, this.state.enthusiasmLevel -1)})
    getExclamationMarks = (numChars: number) => Array(numChars + 1).join("!")   // Array(2).join("!") 建一个数组长度为2的空数组，用!分割开，就是!! 可以用来做连续符号
    getPCount = (data:number) => {      // getPCount:父传子函数 data:number 子传父参数
        if(data !== 0){
            this.setState({ count: data })
        }else {
            this.setState({ count: this.state.count + 1})
        }
    }
    getDCount = () => this.setState({ count: this.state.count - 1})
    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.greeting}>
                    Hello {this.props.name + this.getExclamationMarks(this.state.enthusiasmLevel)}
                </Text>
                
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button
                            title="-"
                            onPress={this.onDecrement}
                            accessibilityLabel="decrement"
                            color="red"
                        ></Button>
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="+"
                            onPress={this.onIncrement}
                            accessibilityLabel="increment"
                            color="blue"
                        >
                        </Button>
                    </View>
                </View>
                <Child title="count++" count={this.state.count} getPCount={this.getPCount} />
                <Child title="count--" count={this.state.count} getDCount={this.getDCount} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        alignSelf: "center"
    },
    buttons: {
        flexDirection: "row",
        minHeight: 70,
        alignItems: "stretch",
        alignSelf: "center",
        borderWidth: 5
    },
    button: {
        flex: 1,
        paddingVertical: 0
    },
    greeting: {
        color: "#999",
        fontWeight: "bold"
    }
})