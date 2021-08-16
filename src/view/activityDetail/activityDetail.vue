<template>
    <div class="activityDetail">
      <Header></Header>
<!--        <x-header :left-options="{backText: ''}" class="header-wrapper">图片详情</x-header>-->
        <!-- <van-nav-bar title="图片详情" left-arrow class="header-wrapper"/> -->
        <div v-transfer-dom>
            <x-dialog v-model="show" class="dialog-demo">
                <div class="img-box" style="position:relative;">
                    <img src="@/assets/img/activityDetail/test.jpg" style="max-width:100%" />
                    <div
                        style="position:absolute; width:100%; height:100%; background-color:rgba(0,0,0,0.6); top:0;"
                    >
                        <img
                            src="@/assets/img/line.png"
                            style="width:1.8rem; height:4.9rem; margin-top:2rem;"
                        />
                        <div
                            style="color:#fff; margin-top:0.5rem; text-align:left; font-size:.32rem;"
                        >1.苹果手机无法保存图片，所以您只能通过长按保存的方式。</div>
                        <div
                            style="color:#fff; margin-top:0.5rem; text-align:left; font-size:.32rem;"
                        >2.长按此图片进行保存。</div>
                    </div>
                </div>
                <div @click="hideDialog">
                    <img
                        src="@/assets/img/activityDetail/close.png"
                        style="width:16px; height:16px; padding:10px 0;"
                    />
                </div>
            </x-dialog>
        </div>

        <div class="content" style="padding-top: 0.4rem">
            <div class="banner">
<!--                <swiper loop auto height="6.666666rem">-->
<!--                    <swiper-item>-->
<!--                        <img v-lazy="goodsDetail.image_url" :key="goodsDetail.image_url" />-->
<!--                    </swiper-item>-->
<!--                </swiper>-->
              <img v-lazy="goodsDetail.image_url" lazy="loaded" style="width: 90%; margin-left: 5%; height: auto !important;" />
            </div>

          <div  class="solid_border" style="margin-bottom: 0.4rem; margin-top: 0.5rem;"></div>

          <div class="images_title">{{ goodsDetail.title }}</div>

          <div class="down_img" style="font-size: 0.5rem;" @click="downLoad">图片下载</div>
          <div v-if="userinfo.is_elme === 0" @click="goDownCard" class="purchase_card">购买下载卡</div>

          <p style="color: rgb(153, 153, 153); text-align: center; font-size: 0.35rem; margin-top: 0.3rem;"> 立即下载即可获得高清无水印大图</p>

          <div class="solid_border" style="margin-top: 0.6rem;"></div>

          <div  class="detail_img_content">
            <div  class="de_box_1">
              <span  class="de_l">购买授权:</span>
              <span  class="de_3">图片版权授权期为自下载之日起一年</span>
            </div>
            <div  class="de_box_2">
              <span  class="de_l">图片类型:</span>
              <span  class="de_3">JPG{{imgWidth}}&times;{{imgHeight}}</span>
            </div>
            <div  style="clear: both;"></div>
            <div  class="de_box_3">
              <span class="de_l">图片ID:</span>
              <span type="number" class="de_3">{{goodsDetail.uuid}}</span>
              <span class="de_l">版权所有:</span>
              <span class="de_3">食图图</span>
            </div>
            <div class="de_box_4">
              <span class="de_l">授权范围:</span>
              <span class="de_3">可做商用、个人</span>
            </div>
            <div class="de_box_5">
              <div class="de_4_box">
                <span class="de_4">收藏</span>
                <img v-if="goodsDetail.isCollection" src="@/assets/img/classify/collection_hover.png" @click="addShopCar()" alt="" class="de_4_img"  />
                <img v-else src="@/assets/img/classify/collection.png" @click="addShopCar()" alt="" class="de_4_img" />
                <div style="clear: both;"></div>
              </div>
              <div class="de_4_box">
                <span class="de_4">举报</span>
                <img src="@/assets/img/classify/jubao.png" @click="goReport()" alt="" class="de_4_img" />
                <div style="clear: both;"></div>
              </div>
<!--              <div  class="de_4_box">-->
<!--                <span  class="de_4">分享</span>-->
<!--                <img  src="@/assets/img/activityDetail/qq.png" alt="" class="de_4_img" />-->
<!--                <div  style="clear: both;"></div>-->
<!--              </div>-->
              <!---->
            </div>
            <div id="qrcode" title="https://shitutu.com/activityDetail?id=11028" style="display: none;">
              <canvas width="200" height="200" style="display: none;"></canvas>
              <img alt="Scan me!" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAASgElEQVR4Xu3d0XrbWAgE4Pb9H7r7OW2zlSzl/AJsN+ns7SIODDPAkR33+7dv3358+wv++/HjPozv378vIzt6bvnQLwPxf+areq6eqf6P/O2fFZtbnmrXwVfyUow0jo7djYERSAFBKfSRWy2++hdSi00EckyCCKQgjtsjSuC9+whk3Y8Vo2LpLj0WgVyC63/jCGQNnE6uahNZR9C3uBNItfBXQlHg9nbPiE3zeHSX01wFy06sk3EcrXF699Q4tH66/kYgRUQ7pJMjlRARiKBpNkdYRiCG3Z1VBLKFRISaCYJkmwQTjxw3i0AikHFS/XYYgayhzYq1xUjxWCN7blFesTrdsnMJq56rZx5BpYWoxjZ9ZjVXfU7xUGLKi5dqA9UYbnaaP91BOmTQQNROQOj4UkJ0MNnn0Dmzmqs+p7FJXabvIJ0aaP4RyK6ySohOcSKQ/xFQoqqdClX9RSARyDsCutooCY/ssmIB4bQQ1S6t3WH6PlAlTmdqVXPV5zQ2zT0CGRSIgr63UwFW/T9jl+4QeJKEipE2MxGc1k/P1Eb46d5iaXEikC0CEciaOdqA/uo7yDrNYwvtQFX/mSD3yGk3zwTJinX50quCrtpptxTynjWVCKTYbp9RnKxYWbGu0lN5+elXLO1celFToOXcTkeWV6Q3GzmjOnnOsJAzj9ZQrcF0vJ1zIxBVxM4uAlkDV8UoAjn4MQbtSrJOrUv306J6Zqc7amyZIFsEdCVSfNVfJogimgnyjoA2lkwQIJcqVUHPBFl3VsFI66L7u068vZ3GoXZAydPtofxBoR6qdtUdU0Wk/jvx6rOPJoRiIqKp5nT23GRsVV9XcopArqD1h62sCupaO2HHTmKZzCkCEcQv2GiHl69M6GjvdKBJMnWIr7hJKSZzikAE8Qs2WugIZAuq4ialiEDuUcqKJcw5sJkkUybIugiTjWB92v8WJJArDidthThic4vpFXavOFNz/QqxTXLtiq9P9dOjX6HQr8jhFWdOi/cKqSdtI5Admjre5X5U9aXkUrsIpC6ZCCQCeUfgFULSM+sU7z0ZgUQgEcgHGvr+o/MBQU+cy6cfvcYsA/hlUIVIVyyNQ/3JWzft3NXcz3KSmioez7CLQADlKkmU0BDCm4n6i0AU0bVdBLLGqPy1eCU0hBCBKEjDdhEIAJoJAiChSVYsBErMBEzt0rJ2nMUUgUi1zEZqap6eY0UTZJpcjyb1My6ggklVWFfuG0c0mSSh5HmLQXNVf0L/Z5wZgUglDmyk0FpAIXmHhNNxHMWrZwhuWpJnnBmBaDV2dlJoLWAEUiuC4iu1OosgAqnV5vCV696VFjACqRVB8R0VSMdZZ/fXe8keSn2uk5eUT3MXX1dshCSKkQr1SnwrW8XtGXaH+e8/Se8Q6RVJaPE7ea2KfHY/ePSZei9RjCKQewTuVqxOUSOQLcAdLEWUEcjtq4Tb/zoczARR1hXstDAF1x8+khUrAvmQILo+PLqbRyA16Stuz7CjCVJL89pTSmq5kF87eW0tHXnt5aeF5qni1diqHxR24pjMtZqnrpyXavOKr7srmBHIen2Qi3WHcEf+p7u53CMkzwjk4EevtZurnZJJ/Gkj6HRuIY7m1IljMtdOvNPP0geFQoYrNgpmJkgmyEe8qvIoK9YVte5stQPJEVrATufOBJlpImfrWflzEN1DdYeVQgspr+yh6k+ILjZn56lAFMtXXNKr9dOGpPiqHde++kl6BPJjg3GnMBHImq6Kr9qtT/xpkQkCSAnoYpMJco9AJsgBKzqgAJ/5j3fEl17oIpB7NGUydrigW4yecbgmZsVay0TILzaZIJ9wgtz+WvLPsFVt0h1O3wzgP+L56MvmWhrnFoKTimYaS8lLu6/46tRZMdI4FEt+4RGBKPRbuwhkjYeQX2yuVCgCAbQ6IIH7N5MIJAL5kCtKQh3lYiekPLtUK/HVTmLR7jiNpeQgeIuf3zbqb2+nGGksimVWLEW0aBeB/CMTRN5iCRnOOnfnWeGudi7xpavTUa6ap8ahnVXt5NxJX2fnVV+8HPkbnxYHL4/og0ItfgfgarIRiP3ZaQRSm3gRyI451WagzwlRr0zjTlPaxzLpKxPkAIEOwJkgW0AVS7UTYU76ikAikA0CmSAiwfs/Q+7gVm2qZ3fNI3/0B1MaiCZb9feKDnfl4j65slQxmr7M8utQ/GvP6mveDh4d3kQgOwZ0wIxA1lMkAlljRL9re9S5J8mrO3ImyD1SnTeHEUgE8o5AR9CdlUImGZTp1CQCgbVDd9POTlztNp3id0gtxHz0Pa2Dt+L2Twlk/21eBakjkOoZk121GsPv56qfCGsOiq/4myT0FdxeEdtkg7vlevsYdvvH1VcQ2Nlqd6weIYB37gxX4opA1mhJvabFG4Gs60JfRQc3H5pEIGsEI5BMkHcEdHoKac6oV+221ee601hynY4tE2TduDJBoHEJeSMQvIM8ozsC719mIvl3CKddT8/YA9Xp0q8AXeOVurxdtPE3EA7fAMolvRPIKwCePlPyV/J2iq9nRCBbBCKQaUXAirI/UskbgayL1cHocApkgqxB71hkgnTQu/7sXyWQV/wDOgpZ9VXqeBeBb6qKiM7y1umjuEksrbUDO3L1jGfgoWfQt3m1MNN2EUgN0Qhki5tOpMPGmgmyJqF0GyFlJkj998TWVTq3iEAAveq4P3tNKG+KIKw3ExGg+rrZiVin8VASVmO7kr/URjHPigXIC5hS+EyQunihTKcmKl5asTqdRZMQwh11wr85Nn0xoBh1iipnqP+OncShuE3HoVwa/dkfBSQCWSOlhFh7OrZQ/x27amxMXnyb1hLh5C8rKiARyBopJebaUwQSgVRZcvBcVbxaBA01AtkipXjoXZCnVCbIthARyGOJKQ2CyfuMFUv+AR0ljSR/dPnW59RuOt6jc/edavrMTsec/IC1MxklB7E544xirlPlMNcIRGX3cWfVYulpk8TpECQCgX+j8BnFV+KI3XS8mSBza6hMt86KJbUSDv22ufvRBu1cVw7Z2053tL3/CGT7TyJM4634CpfEJitWR22NN1GdY3MHWaMn5BeblwpE3mLp2Hr0aJzsXOvyXrPoFPraSWtrxWnt6diiM5FkxdK4OnzTHOiT9AhkXbIIZI3RzSIC2eGkxBERamfsnGllvrfSM7VzVeM4ImHHl9Tliv8IJAJ5R0BXgCsEE1ttJOIrAtm1NAW30zGrZ1Sfe1VXjUDu5fXpJ8hRx+gUevJZFeV01xNMOqtTR/jVKaB10diqcXSe6/BBz6U/mFIwhUg3GyWTdBstoJ7JwO2+B9Tx/4octKYam+I2aReBAAm1gB0Ci/A7/l+RQwRiUs0EMZzurGS6qesIRJHa2mWCZIJsGNGZUnsKZoKYKMvfxVL1duykqJbmsVUnNpkgz5gMekYVJxVlVXCdGmhOGtvhKl39unsnsWrA02SYzEF9Tb9hm8ZkH18EUvy6uxKiY5cJsu6REUgNIxZ+JsgWYJ1uWbGei5sSWt44XvqoIQJ5bqGzYq3/VkWb1Hp2/LTo+Bu9pHfUW01Cn+usIrImdjrcdKFlummtVNCKr+DU8TX9bAQC7IxA5j5/iEB2hOt0+CqYQmjQxbuJ+JNYr5ypHX4ytunuq9On+jJGcj/DXJ/NBAHWCpgRyPZucYWYEcgOASGcvmnoTCjQxpuJxBuBfFGBVP8BnelxXCWYCkRXFl0LJP9qTircszc0V56fsn1GrlOxXsGNvqz4DHJVAY5ArHNPkkubyKPP7PiXBvcmpEyQNcyyYr2KNFrodZY9i2qD651af1pxi0AA4whkDdI/IxBVVpU0evlel+SnRWfF0jNkxVSCaLxqNxmb+NKXFmfY7nFSvnVqpVw9tHv0D8c9evXoEKkD+uSn1Z0CCqlVvOIrAjn4NxeU5NoNOgXbxxKB3FenKt4I5McdBA//ZUUVV7WbRyARyIo7nQkdgazQPfn/1S6tglY76fqdia1xVLcHfa5YprfHRgUigOsF7OwSrVOlCl4LEPxnvSS2DjE7hJA1VP13sBQuqf9OvPrsUU3pNa+Q4YpSIxAt2Yyd1q9TF20GMnmn41UUI5AdUtq91G5fCCWNFrBqN004XbsyQYqE63QqIYkSetouAllXJxNkh5F2LyXrugTNS1nuIBuItS46Lb+kQGRUXrmDVEFXsT16Qj3Df5VwGpvWVP11alNtepqD8u3Q3+SXFTWQql2nCHqmFOsZpIlAtih38OjUnt5iTStVA5783o6eGYGsEXg0ltqApnmZCVK8H60p4/ce8XW2riohqi8LdEJHIFBFfdU3aacF1A7U8Sck7PjvrBQSW1VsV+6aQCM26eDRETT9aIOC+YokNHm1U3FJZSebw9l5esb+eRWv4qZ2It5qTjff03lFIMB0Fb6QUImkZ1bJNE0kzSsCAcJpUaWIWhi1ywTZIqC4qV0EEoG8I9BpBJkga6Hq6q9N7/C7WPLj1RrIdFEzQdbdRkUo61+HSP/0BBGinpVSRbOmwvzfn1fJdXQZrBLkCm4ab6deUgfNVWo/nZOceeUyT5f0DuAasBRGwRRfZyBpvK/4TpHm36mXYBeB7FDqAK6Ek8IoQcRXBKIo3dtFIBHIkj2ZIFuIqs1Ln9MmrQ1Z/WXF2kmhCrB21aXyfhmoP7XTc8VOzxQsv4RAnvEWS9+gSAE7NlowOWPS15WVsDrdhNBneWuu2rkFXxVqh1s0QSKQ+99LkgIqacRXBFK/C0UgyjCwmyT1pK8IJAK5Q6Az8kELhyaTpJ70FYFEIBHIQtUquNxB1u1Rm+/oHWQd1k8LvVxJEp1Ln/i/0rkl/yrJz3wrlhKb+lLc5Mzp+nXwPcx/8rtYAkgEcv8vQikx9bJZJZ3GEYEA06tFiEAikD/p9Soe8aTJBFl3AwVz7cm/cKnE0a4vsamvTBBAUwvYWQukENNxHMUbgWxRkboAhd5MpuuntWK7R08Q7UoKaNVOi8rAwT801DlT89Qz9v4m83zGC4QOHprrYXOMQLawKJjS+ZS84usKCYVMk3leia2Tq+SlDZlrE4FEIL8RUHIJUa+8jFF/Yqc5RCA7NBmQF/x4daeral5ZsWr3qPJPj4qauzaP/kRY14xuHn8+r2eqaLRjSg5VsYnv3zZSU/WnWHb8RSDFSaOgP7pzRyC1yXB4IT/YHiKQCOQdgUyQ+w9xI5AIJAL5hcDRyhaBRCARyEcC2b/mre7W3eeq410vap1Lr+6re7tqTjc/Gu9RbPtzOxhpDtV49Q6ldoLHFa7efd39ysOTtlqIV1x6I5B1pSOQNUYtiwhkC1+VcDcvmSCDb7ayYtXAFAJXRZ8V6/F/EqDdPCtW8ZIegcxMPL1bqN3D7yCdrseqxK9zyH1DARFCH60nZ91c1hjFQ3OYvAt18NC85IwO38R/p6Zvta9+WVFB0qIKUNOAKDHlLZDGprgJHrqKvaz7Dv5JgPJosqYRyAGaSqZMkLXUpWloI4hAfqx/vVAAvzJSJ7uNxram1U8LJY6cq6JXPDSHamyT/q/w4RCnrFjbciiZMkHWNP5nBCKJnsFVJZzu1+sy9Tuy5rCPpTMFqmfqFPgKNe3kyrWRCfIVwGRA8A2bYPKKMzuk6TQbeZEx3fQ6uXJtIpAtzJOF5iIMirJDmgjkHgF6zSvdMivWPQIRyP2Llw6XRMC6mnJtMkEyQYR4f9p0SBiB7NCeBFNVf7Xgf9prASWWzrom/s92en1WcOrgIfmLzSPy1Lw+1Yo1WfgzcihwEssziq9niBiObDp4SGxiE4HgP4kgpKwS4fdzHULsz35G8fWMKi4dPCQ2sYlAIpA7/mozUIJFIOu75uEE/UyXdCVNlQxX3tNLLEpetdMVSGJTjDJBvn3bvIvTS7UCrP7Ubn+uPqek6ZC1umJNE3+fQyf3o9g6mKvglF9i14r3M02Q6WJNEzMC2SKgxBSSd2w0jkO7CGS9m2oHjkAikMtCbqm3+Ac3nTWp82wEEoFEIBcQ6Iht8lmdgHo/eHTTuwAxmbbilRWLorhg1Cn+ZJe+EHLJtEM4PbCK5TNi0zuevHhRX51mUL6DaLHUrlrUaZA03qrdM0hYxfIZsWm9IpAdAtWiKuDaRarE1+eeQcIqls+ITesVgUQgH2qqI+gIZP1iQIWaFUtb/5DdM7p0BPJkgQxx47KbThe9fNivB5TAR/4l3ip5b+c9OjbFTOPovCmSWDSOaq3OYvj0Pz0q4J4mD5+znD0bgaw7d6dB7HGPQOB3sTpi0D1Uz4hAIhDlyoidEG7koD+cPLordTroo2NTLDWOrFiKaNEuAtkCp8Sc3rmrq81XFch/+9ceQ4yCubcAAAAASUVORK5CYII=" style="display: block;" />
            </div>
            <div style="clear: both;"></div>
          </div>


          <div  class="solid_border" style="margin-top: 0.4rem;"></div>


<!--            <div class="image-intro">-->
<!--                <div class="image-title">{{goodsDetail.title}}</div>-->
<!--                <div class="price">-->
<!--                    <div class="price-left" v-if="userinfo.is_elme!=1">¥{{goodsDetail.price}}</div>-->
<!--                    <div class="price-left" v-if="userinfo.is_elme==1"></div>-->
<!--                    <div class="price-right">图片版权授权期为自下载之日起一年</div>-->
<!--                </div>-->
<!--                <div class="vip-price">-->
<!--                    <div class="vip-price-left" v-if="userinfo.is_elme!=1">-->
<!--                        <span>¥{{goodsDetail.member_price}}</span>-->
<!--                        <span style="background-color:#fccc27; margin-left:5px;">会员价</span>-->
<!--                    </div>-->
<!--                    <div class="vip-price-left" v-if="userinfo.is_elme==1"></div>-->
<!--                    <div class="vip-price-right">图片编号NO.{{goodsDetail.uuid}}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="line"></div>-->


            <div class="more">
                <div class="more-title" style="font-size: 0.45rem;">相似照片</div>
                <div class="more-img-box" style="column-count: 2; column-gap: 10px;">

                    <img
                        v-lazy="item.url"
                        v-for="(item,index) in goodsDetail.recommend"
                        :key="index"
                        @click="goDetail(item)"
                        style="break-inside: avoid; margin-bottom: 0.05rem; height: auto;"
                    />
                </div>



            </div>

        </div>
        <div class="control-box">
<!--            <div-->
<!--                class="open-vip"-->
<!--                @click="goMembership"-->
<!--                v-if="userinfo.is_vip==0 && userinfo.is_elme!=1"-->
<!--            >开通会员</div>-->
<!--            <div class="open-vip" v-if="userinfo.is_vip!=0 || userinfo.is_elme==1"></div>-->
<!--            <div class="btn-right" v-if="!goodsDetail.isBuy || userinfo.is_elme==1">-->
<!--                <div class="add-car" @click="addShopCar" v-show="!goodsDetail.isCollection">收藏</div>-->
<!--                <div class="add-car" @click="addShopCar" v-show="goodsDetail.isCollection">已收藏</div>-->
<!--                <div class="buy-now" @click="goPayment" v-if="userinfo.is_elme==0">立即下载</div>-->
<!--                <div class="buy-now" @click="downLoad" v-if="userinfo.is_elme==1">无水印下载</div>-->
<!--            </div>-->
<!--            <div-->
<!--                class="btn-dowload"-->
<!--                v-if="goodsDetail.isBuy && userinfo.is_elme==0"-->
<!--                @click="downLoad"-->
<!--            >下载</div>-->
        </div>

      <div  @click="goReport()" :id="dis_requ_show" class="requirements_shadow" ref="homePage" >
        <div onclick="event.cancelBubble = true" class="requirements demand-wrapper-commit" style="height: 9.5rem;">
          <div class="requirements_title">
            举报
          </div>
          <ul class="box">
            <li   :class="{'checked':item.bOn === true}" v-for="(item,index) in reportList"  :key="index" @click="selectReport(index)" >{{item.title}}</li>
<!--            <li class="">图片模糊</li>-->
<!--            <li class="">侵权/盗版</li>-->
<!--            <li class="">图片重复</li>-->
<!--            <li class="">下载失败</li>-->
<!--            <li class="">色情低俗</li>-->
<!--            <li class="">其他原因</li>-->
          </ul>
          <div class="van-cell-group van-hairline--top-bottom">
            <div class="input_textarea van-cell van-field van-field--min-height">
              <div class="van-cell__value van-cell__value--alone van-field__value">
                <div class="van-field__body">
                  <textarea placeholder="请输入举报内容" v-model="message" class="van-field__control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <a  href="#" class="down_img" style="margin-top: 0.6rem;" @click="goReportSave">提交</a>
        </div>
      </div>

      <div class="down_card_message"  v-if="userinfo.is_elme === 1">
        <div class="use_m_l">
          <p >
            <img src="@/assets/img/downCard/free.png"   class="user_icon" />
            <span >剩余下载次数 </span>
            <span style="color: rgb(0, 157, 251);">{{userinfo.free_download_num}}张</span>
          </p>

        </div>
        <div class="use_m_r">
          <p >
            <img src="@/assets/img/downCard/down.png" style="width: 0.55rem" class="user_icon">
            <span >已下载次数</span>
            <span  style="color: rgb(0, 157, 251);">{{userinfo.download_num}}张</span>
          </p>
        </div>
      </div>

    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import store from "store";
import { NavBar,Toast } from 'vant';
import {
    XHeader,
    XButton,
    Swiper,
    SwiperItem,
    Alert,
    XDialog,
    TransferDomDirective as TransferDom
} from "vux";
import {
    seeImageDetail,
    collection,
    download,
    download2,
  reportSave
} from "../../http/api.js";
export default {
    directives: {
        TransferDom
    },
    components: {
        NavBar,
        XHeader,
        XButton,
        Swiper,
        SwiperItem,
        Alert,
        XDialog,
        Header,
      Toast
    },
    data() {
        return {
            details_id: "",
            goodsDetail: {},
            userinfo: {},
            vipStatus: "开通会员",
            downName: "",
            show: false,
            isWeixin: false,
          imgWidth:0,
          imgHeight:0,
          clientHeight: '',
          dis_requ_show:'dis_requ_none',
          reportList:[
            {id:1,title:'图片损坏',bOn:false},
            {id:2,title:'图片模糊',bOn:false},
            {id:3,title:'侵权/盗版',bOn:false},
            {id:4,title:'图片重复',bOn:false},
            {id:5,title:'下载失败',bOn:false},
            {id:6,title:'色情低俗',bOn:false},
            {id:7,title:'其他原因',bOn:false},
          ],
          arr:[],
          message:''
        };
    },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
    watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      },
        details_id(v, o) {
            let params = {
                id: this.$route.query.id
            };
            if (store.get("userinfo") && store.get("userinfo").token) {
                params.token = store.get("userinfo").token;
            }
            seeImageDetail(params).then(res => {
                console.log(res);
                if (res.code == 1) {
                    this.goodsDetail = res.data;
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        }
    },
    methods: {
      changeFixed(clientHeight) {                        //动态修改样式
        console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight + 'px';
        console.log( this.$refs.homePage.style.height,' this.$refs.homePage.style.height')
      },
      selectReport(e){
        this.reportList[e].bOn = true
      },
      getImgInfo () {

        var that = this;
        var img = new Image();
        // 改变图片的src
        img.src = that.goodsDetail.image_url;
        let res = {}
        img.onload = function () {
          res = {
            width: img.width,
            height: img.height
          }
          that.imgWidth = res.width
          that.imgHeight = res.height
        //  that.model.data.firstPicWh = res;
         // console.log(res);  //打印的即是图片的宽高
        }
        // let self =this;
        //
        // let img =new Image()
        //
        // img.src=self.goodsDetail.image_url
        //
        // img.onload=function () {
        //   console.log(12312312312)
        //   console.log('图片原始高度', img.height)
        //
        //   console.log('图片原始宽度',img.width)
        //
        // }
      },

        goDetail(e) {
            this.$vux.loading.show({
                text: ""
            });
            window.setTimeout(() => {
                this.$vux.loading.hide();
            }, 500);
            this.details_id = e.id;
            this.$router.push({ path: "/activityDetail", query: { id: e.id } });
        },
      goReport(){
        if(this.dis_requ_show === 'dis_requ_none'){
          this.dis_requ_show = 'dis_requ_show'
        }else{
          this.dis_requ_show = 'dis_requ_none'
        }
      },
      goReportSave(){

        for (var i=0,len=this.reportList.length; i<len; i++)
        {
          if(this.reportList[i].bOn === true){
            this.arr.push(this.reportList[i]);
          }
        }

        reportSave({
          report_cate: JSON.stringify(this.arr),
          user_id: this.userinfo.id,
          user_name:this.userinfo.nickname,
          message:this.message,
        }).then(res => {
          if (res.code === 1) {
            this.$vux.toast.text(res.msg, "middle");
            this.dis_requ_show = 'dis_requ_none'
          } else {
            this.$vux.toast.text(res.msg, "middle");
          }
        });
      },
        addShopCar() {
            //添加收藏
            if (!store.get("userinfo") || !store.get("userinfo").token) {
                this.$vux.toast.text("您还未登陆,请先登陆", "middle");
                window.setTimeout(() => {
                    this.$router.push({ path: "/login" });
                }, 500);
                return;
            }
            collection({
                image_id: this.$route.query.id,
                token: store.get("userinfo").token
            }).then(res => {
                if (res.code == 1 || res.code == 2) {
                    this.goodsDetail.isCollection = !this.goodsDetail
                        .isCollection;
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        },
        goMembership() {
            //跳转会员页
            this.$router.push({ path: "/mine" });
        },
        goPayment() {
            //跳转购买页
            if (!store.get("userinfo") || !store.get("userinfo").token) {
                this.$vux.toast.text("您还未登陆,请先登陆", "middle");
                window.setTimeout(() => {
                    this.$router.push({ path: "/login" });
                }, 500);
                return;
            }
            this.$router.push({
                path: "/payment",
                query: { id: this.$route.query.id }
            });
        },
      goDownCard(){
        this.$router.push({ path: "/downCard" });
      },
        downLoad() {
            //下载图片
            download2({
                image_id: this.$route.query.id,
                token: store.get("userinfo").token
            }).then(res => {
                if (res.code == 1001) {
                    this.$router.push({
                        path: "/imgPreview",
                        query: { url: escape(res.data.url) }
                    });
                } else if (res.code == 1002) {
                    window.location.href = res.data.url;
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                    if( this.userinfo.is_elme === 1){

                    }else{
                      this.$dialog.confirm({
                        title: "提示",
                        message: "是否跳转购买下载卡",
                        confirmButtonText: "确认", //改变确认按钮上显示的文字
                        cancelButtonText: "取消" //改变取消按钮上显示的文字
                      }).then(()=> {
                        this.$router.push({ path: "/downCard" });
                      }).catch(() => {
                        console.log("点击了取消按钮噢")
                      })
                    }

                }
            });
        },
        hideDialog() {
            //关闭弹窗
            this.show = false;
            store.set("alertStatus", false);
        }
    },
    created() {
        let params = {
            id: this.$route.query.id
        };
        console.log(store.get("userinfo"))
        if (store.get("userinfo") && store.get("userinfo").token) {
            params.token = store.get("userinfo").token;
            this.userinfo = store.get("userinfo");
            console.log(this.userinfo)
        }
        seeImageDetail(params).then(res => {
            if (res.code == 1) {
                this.goodsDetail = res.data;
              this.getImgInfo()
            } else {
                this.$vux.toast.text(res.msg, "middle");
            }
        });

        if (store.get("mobileType") == 0 && store.get("alertStatus")) {
            this.show = true;
        }
    }
};
</script>

<style lang="scss" scoped>
ul{
  padding: 0;
  list-style: none;
  width: 90%;
  margin-left: 5%;
}
li {
  width: 30%;
  height: 30px;
  display: inline-block;
  font-size: .35rem;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin-left: 5px;
}
li.checked{
  color: #009dfb;
}
li:before {
  display: inline-block;
  width: 10px;
  height: 10px;
  line-height: 20px;
  content: "";
  border: 1px solid #333;
  margin-right: .11rem;
  transition: all .3s linear;
}
li.checked:before {
  background-color: #009dfb;
  border: 1px solid #009dfb;
}
</style>
