{
  /* calendar */
}
<View style={styles.container}>
  {/* Calendar Button */}
  <TouchableOpacity onPress={toggleCalendar} style={styles.toggleButton}>
    <View style={styles.toggleInnerButton}>
      <VectorIcon
        type={'Entypo'}
        name={'calendar'}
        color={Colors.Black}
        size={20}
        style={styles.vactorIcon}
      />
      <Text
        style={[
          styles.toggleButtonText,
          {marginLeft: wp(1), fontWeight: '700', marginTop: hp(0.2)},
        ]}>
        {selectedDate ? selectedDate : 'Task-Management'}
      </Text>
    </View>
    <View style={styles.toggleInnerButton}>
      <VectorIcon
        type={'Ionicons'}
        name={'chevron-down'}
        color={Colors.Black}
        size={25}
        style={styles.vactorIcon}
      />
      <Text />
      <VectorIcon
        type={'Ionicons'}
        name={'chevron-up'}
        color={Colors.Black}
        size={25}
        style={styles.vactorIcon}
      />
    </View>
  </TouchableOpacity>

  {loading ? (
    <LoaderCom />
  ) : (
    <View>
      <Animated.View
        style={[styles.calendarContainer, {height: calendarHeight}]}>
        <Calendar
          current={formattedDate}
          onDayPress={onDayPress}
          monthFormat={'MMM yyyy'}
          markingType={'custom'}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.Primary,
              selectedTextColor: Colors.Black,
            },
          }}
        />
      </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {eventDetails ? (
            <ScrollView
              style={{marginBottom: hp(54)}}
              showsVerticalScrollIndicator={false}>
              <View>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                  <View key={item}>
                    <View style={styles.detailsContainer}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        // onPress={() => alert('alert calender')}
                        onPress={() =>
                          navigation.navigate(ScreensName.TASKMANAGEPROJECT)
                        }
                        style={[styles.detailsContainerinsideLeft]}>
                        <Text style={[styles.eventTitle, {fontSize: hp(2)}]}>
                          21
                        </Text>
                        <Text style={[styles.eventTitle, {fontSize: hp(1.5)}]}>
                          NOV, TUE
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.detailsContainerinsideRight}>
                        <Text
                          style={[
                            styles.eventDetails,
                            {fontSize: hp(2.5), width: '80%'},
                          ]}
                          numberOfLines={1}>
                          Lorem Lyupsem sampl Lorem Lyupsem sampl..
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => alert('pdf download')}>
                            <VectorIcon
                              type={'FontAwesome'}
                              name={'file-pdf-o'}
                              color={'red'}
                              size={20}
                              style={[styles.vactorIcon, {marginRight: wp(2)}]}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => toggleCollapse(index)} // Toggle based on index
                          >
                            <VectorIcon
                              type={'Ionicons'}
                              name={'chevron-down'}
                              color={Colors.Black}
                              size={25}
                              style={styles.vactorIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/* Collapsible section, only opens if index matches */}
                    <Collapsible collapsed={expandedIndex !== index}>
                      <View
                        style={{
                          backgroundColor: Colors.skyBlue,
                          borderRadius: wp(3),
                          padding: wp(2),
                          marginHorizontal: wp(1.5),
                          marginTop: hp(-2),
                        }}>
                        <Text
                          style={{
                            color: Colors.Black,
                            fontSize: hp(2.3),
                            fontFamily: Fonts.InterBold700,
                            marginTop: hp(2),
                          }}>
                          Lorem Lyupsem sampl
                        </Text>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: hp(2),
                            fontFamily: Fonts.InterMedium500,
                          }}>
                          <Text
                            style={{
                              color: Colors.Black,
                              fontFamily: Fonts.InterBold700,
                            }}>
                            Deadline :
                          </Text>{' '}
                          2025-01-08
                        </Text>
                        <Text>
                          Task Management App is a digital tool designed to help
                          users organize, track, and complete tasks efficiently.
                          It is used by individuals, teams, and businesses to
                          improve productivity, ensure better task coordination,
                          and manage time effectively. The app allows users to
                          create tasks, set deadlines, prioritize workloads,
                          collaborate with team members, and track progress all
                          within a single platform.
                        </Text>
                        <Text
                          style={{
                            color: Colors.Black,
                            fontSize: hp(2.3),
                            fontFamily: Fonts.InterBold700,
                            marginTop: hp(2),
                            marginBottom: hp(0.5),
                          }}>
                          Attachments
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: wp(2),
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              alert('pdf');
                            }}>
                            <VectorIcon
                              type={'MaterialCommunityIcons'}
                              name={'file-pdf-box'}
                              color={'red'}
                              size={40}
                              style={styles.vactorIcon}
                            />
                          </TouchableOpacity>
                          <View>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(2),
                                fontFamily: Fonts.InterMedium500,
                              }}>
                              Photo-2022_04-20 19.30.49
                            </Text>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(1.8),
                                fontFamily: Fonts.InterRegular400,
                                marginTop: hp(-0.5),
                              }}>
                              JPG. 2.3 MB
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: wp(2),
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              alert('pdf');
                            }}>
                            <VectorIcon
                              type={'MaterialCommunityIcons'}
                              name={'file-pdf-box'}
                              color={'red'}
                              size={40}
                              style={styles.vactorIcon}
                            />
                          </TouchableOpacity>
                          <View>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(2),
                                fontFamily: Fonts.InterMedium500,
                              }}>
                              Photo-2022_04-20 19.30.49
                            </Text>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(1.8),
                                fontFamily: Fonts.InterRegular400,
                                marginTop: hp(-0.5),
                              }}>
                              JPG. 2.3 MB
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: wp(2),
                          }}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                              alert('pdf');
                            }}>
                            <VectorIcon
                              type={'MaterialCommunityIcons'}
                              name={'file-pdf-box'}
                              color={'red'}
                              size={40}
                              style={styles.vactorIcon}
                            />
                          </TouchableOpacity>
                          <View>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(2),
                                fontFamily: Fonts.InterMedium500,
                              }}>
                              Photo-2022_04-20 19.30.49
                            </Text>
                            <Text
                              style={{
                                color: Colors.Black,
                                fontSize: hp(1.8),
                                fontFamily: Fonts.InterRegular400,
                                marginTop: hp(-0.5),
                              }}>
                              JPG. 2.3 MB
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            fontSize: hp(2),
                            textAlign: 'center',
                            fontFamily: Fonts.InterBold700,
                            color: '#8a62fe',
                            padding: wp(4),
                          }}
                          // onPress={() => alert('alala')}
                          onPress={() =>
                            navigation.navigate(
                              ScreensName.TASKMANAGERELATEDQUERY,
                            )
                          }>
                          View Detailed Task
                        </Text>
                      </View>
                    </Collapsible>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={styles.noEvent}>No data Found ..</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )}
</View>;
