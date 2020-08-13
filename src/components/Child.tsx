import React from 'react';
import { Text, StyleSheet, View, Button} from 'react-native';


interface Props {
    count: number,
    getPCount?: (data: number)=> void,
    getDCount?: ()=> void,
    title: string
}
interface State {
    getCount: ()=> void
}

export class Child extends React.Component<Props,State> {

    constructor(props: Props){
        super(props)
    }

    getCount = ()=> {
        const { title } = this.props;
        if(title === "count++"){
            if(this.props.getPCount)
            this.props.getPCount(3);
        }else {
            if(this.props.getDCount)
            this.props.getDCount();
        }
        
    }
    render () {
        return (
            <View>
                <Text style={styles.textshow}>
                    点击次数: {this.props.count}
                </Text>
                <Button
                    title={this.props.title}
                    onPress={this.getCount}
                    accessibilityLabel="count"
                    color="green">
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textshow: {
        color: "red",
        height: 35
    }
})