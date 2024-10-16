import { LayoutAnimation, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../common/Text.tsx'
import type { ClubResponse } from '../../module/club/dto/response'
import { FontAwesome5, Ionicons, SimpleLineIcons } from '../../lib/icon/icons.ts'
import TouchableScale from '../common/TouchableScale.tsx'
import { useState } from 'react'
import { Activity } from '../../module/club/dto/enum.ts'

interface Props {
  club: ClubResponse
}

const ClubDetail = ({ club }: Props) => {
  const [showPresidentInfo, setShowPresidentInfo] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <FontAwesome5 name="user-graduate" size={30} color="rgb(40, 40, 40)" />
        <View style={{ gap: 6 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}>
            경쟁률 <Text style={{ fontWeight: 'bold', letterSpacing: -0.5 }}>2.3</Text>:1
          </Text>
          <Text style={{ fontSize: 12 }}>이번 기수에 해당 동아리에 신청한 학생 수는 72명이에요.</Text>
        </View>
      </View>
      <View
        style={{
          gap: 10,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: 'rgb(242, 242, 242)'
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            paddingHorizontal: 15
          }}>
          <FontAwesome5 name="check" size={14} />
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold'
            }}>
            공지사항
          </Text>
        </View>
        {club.notification && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12
            }}>
            <Text style={{ fontSize: 12 }}>{club.notification}</Text>
          </View>
        )}
      </View>
      <View
        style={{
          gap: 15,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: 'rgb(242, 242, 242)'
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
            paddingHorizontal: 13
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 8
            }}>
            <Ionicons name="person" size={14} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'bold'
              }}>
              회장
            </Text>
          </View>
          <TouchableScale
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
              setShowPresidentInfo(current => !current)
            }}>
            <SimpleLineIcons name={showPresidentInfo ? 'arrow-up' : 'arrow-down'} size={10} />
          </TouchableScale>
        </View>
        <Information name="이름" value={club.president.name} />
        {showPresidentInfo && (
          <>
            <Information name="학과" value={club.president.major} />
            <Information name="학년" value={club.president.grade.toString()} />
            <Information
              name="이메일"
              value={club.president.email}
              onPress={() => Linking.openURL(`mailto:${club.president.email}`)}
            />
          </>
        )}
      </View>
      <View style={styles.information}>
        <Information name="부원 수" value="54명" />
        {club.room && <Information name="동아리방" value={club.room} />}
        <Information name="점수" value={club.score.toString()} />
        <Information name="기수" value={club.generation.toString()} />
        <Information name="활동" value={Activity[club.activity]} />
      </View>
    </View>
  )
}

const Information = ({ name, value, onPress }: { name: string; value: string; onPress?: () => void }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 'normal'
        }}>
        {name}
      </Text>
      <TouchableOpacity style={{ flex: 2 }} activeOpacity={onPress ? 0.6 : 1} onPress={onPress}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'right'
          }}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 10
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: 'rgb(220, 230, 255)'
  },
  information: {
    gap: 15,
    paddingVertical: 15,
    borderRadius: 12
  }
})

export default ClubDetail
