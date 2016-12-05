;; copypaste from https://gist.github.com/jizhang/4325757
(import 'java.security.MessageDigest
        'java.math.BigInteger)

(defn md5 [s]
  (let [algorithm (MessageDigest/getInstance "MD5")
        size (* 2 (.getDigestLength algorithm))
        raw (.digest algorithm (.getBytes s))
        sig (.toString (BigInteger. 1 raw) 16)
        padding (apply str (repeat (- size (count sig)) "0"))]
    (str padding sig)))

(defn is-advent-coin?
  [leading-zeros key]
  (-> (md5 key)
      (subs 0 leading-zeros)
      (= (apply str (repeat leading-zeros \0)))))

(defn find-advent-coin [n k]
  (subs (first
          (filter (partial is-advent-coin? n)
                  (map #(str k %)
                       (iterate inc 100000))))
        (count k)))

;; Part 1
(find-advent-coin 5 "yzbqklnj")

;; Part 2 (this one takes a few seconds)
(find-advent-coin 6 "yzbqklnj")
